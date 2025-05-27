// src/utils/fileUtils.ts

/**
 * Descarga un archivo desde la carpeta public/files
 */
export const downloadFile = (filename: string = 'documento_prueba.docx', displayName?: string) => {
    try {
        // Crear un enlace temporal para la descarga
        const link = document.createElement('a');
        link.href = `/files/${filename}`;
        link.download = displayName || filename;
        link.target = '_blank';

        // Agregar al DOM, hacer clic y remover
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Descargando archivo: ${filename}`);
    } catch (error) {
        console.error('Error al descargar archivo:', error);
        alert('Error al descargar el archivo. Por favor, intenta nuevamente.');
    }
};

/**
 * Abre una vista previa del archivo sin descargarlo permanentemente
 */
export const previewFile = (filename: string = 'documento_prueba.docx', title: string = 'Vista Previa') => {
    try {
        const extension = filename.toLowerCase().split('.').pop();
        const fileUrl = `/files/${filename}`;

        if (extension === 'pdf') {
            // Para PDFs, abrir directamente en el navegador
            window.open(fileUrl, '_blank');
        } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension || '')) {
            // Para imágenes, abrir directamente
            window.open(fileUrl, '_blank');
        } else if (['doc', 'docx'].includes(extension || '')) {
            // Para documentos Word, usar Google Docs Viewer para vista previa
            showDocumentPreview(fileUrl, title);
        } else {
            // Para otros tipos, mostrar opción de descarga
            if (confirm(`No se puede previsualizar este tipo de archivo (${extension}). ¿Deseas descargarlo?`)) {
                downloadFile(filename, title);
            }
        }

        console.log(`Abriendo vista previa: ${filename}`);
    } catch (error) {
        console.error('Error al abrir vista previa:', error);
        alert('Error al abrir la vista previa. Por favor, intenta nuevamente.');
    }
};

/**
 * Muestra un modal con vista previa del documento usando Google Docs Viewer
 */
const showDocumentPreview = (fileUrl: string, title: string) => {
    // Crear modal para vista previa
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
    background: white;
    width: 90%;
    height: 90%;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
  `;

    const header = document.createElement('div');
    header.style.cssText = `
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
    header.innerHTML = `
    <h3 style="margin: 0; color: #1f2937; font-size: 18px;">${title}</h3>
    <button id="closePreview" style="
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7280;
      padding: 4px;
    ">&times;</button>
  `;

    const iframeContainer = document.createElement('div');
    iframeContainer.style.cssText = `
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
  `;

    // Intentar Google Docs Viewer primero
    const fullFileUrl = `${window.location.origin}${fileUrl}`;
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullFileUrl)}&embedded=true`;

    const iframe = document.createElement('iframe');
    iframe.src = googleViewerUrl;
    iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
  `;

    // Mensaje alternativo si Google Viewer no funciona
    const fallbackMessage = document.createElement('div');
    fallbackMessage.style.cssText = `
    display: none;
    text-align: center;
    padding: 40px;
    color: #6b7280;
  `;
    fallbackMessage.innerHTML = `
    <p>No se puede mostrar la vista previa de este documento.</p>
    <button id="downloadFromPreview" style="
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 16px;
    ">Descargar documento</button>
  `;

    // Detectar si el iframe no carga correctamente
    iframe.onload = () => {
        try {
            // Si Google Viewer no está disponible, mostrar mensaje alternativo
            if (iframe.contentWindow?.location.href.includes('error')) {
                iframe.style.display = 'none';
                fallbackMessage.style.display = 'block';
            }
        } catch (e) {
            // Error de CORS es normal, significa que el iframe cargó correctamente
        }
    };

    iframe.onerror = () => {
        iframe.style.display = 'none';
        fallbackMessage.style.display = 'block';
    };

    // Ensamblar modal
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(fallbackMessage);
    modalContent.appendChild(header);
    modalContent.appendChild(iframeContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Event listeners para cerrar
    const closeModal = () => {
        document.body.removeChild(modal);
    };

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    header.querySelector('#closePreview')?.addEventListener('click', closeModal);

    fallbackMessage.querySelector('#downloadFromPreview')?.addEventListener('click', () => {
        downloadFile('documento_prueba.docx', title);
        closeModal();
    });

    // Cerrar con ESC
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
};

/**
 * Determina si un archivo se puede previsualizar en el navegador
 */
export const canPreviewInBrowser = (filename: string): boolean => {
    const extension = filename.toLowerCase().split('.').pop();
    const previewableExtensions = ['pdf', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'svg'];
    return previewableExtensions.includes(extension || '');
};

/**
 * Obtiene el icono apropiado para un tipo de archivo
 */
export const getFileIcon = (filename: string): string => {
    const extension = filename.toLowerCase().split('.').pop();

    switch (extension) {
        case 'pdf':
            return '📄';
        case 'doc':
        case 'docx':
            return '📝';
        case 'xls':
        case 'xlsx':
            return '📊';
        case 'ppt':
        case 'pptx':
            return '📋';
        case 'dwg':
            return '📐';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return '🖼️';
        default:
            return '📁';
    }
};

/**
 * Formatea el tamaño de archivo para mostrar
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};