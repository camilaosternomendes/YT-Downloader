import React, { useState } from 'react';
import { toast } from "sonner";
import { Download, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = () => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadResult, setDownloadResult] = useState(null);

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+(&\S*)?$/;
    return youtubeRegex.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setIsValidUrl(validateYouTubeUrl(newUrl));
    setDownloadResult(null);
  };

  const handleDownload = async () => {
    if (!isValidUrl) {
      toast.error("Por favor, insira uma URL válida do YouTube");
      return;
    }

    setIsDownloading(true);
    
    try {
      // Simulação de download - aqui você integraria com o backend pytube
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulação de sucesso
      setDownloadResult({
        success: true,
        title: "Vídeo do YouTube",
        duration: "3:45",
        quality: "720p"
      });
      
      toast.success("Download iniciado com sucesso!");
      
    } catch (error) {
      setDownloadResult({
        success: false,
        error: "Erro ao processar o vídeo"
      });
      toast.error("Erro ao fazer download do vídeo");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-6 col-md-8 col-sm-10">
            
            {/* Header */}
            <div className="text-center mb-5">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Youtube size={30} color="white" />
                </div>
                <h1 className="text-white mb-0 fw-bold display-5">
                  YT Downloader
                </h1>
              </div>
              <p className="text-white opacity-75 fs-5">
                Baixe vídeos do YouTube de forma rápida e simples
              </p>
            </div>

            {/* Main Card */}
            <div 
              className="card border-0 shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px'
              }}
            >
              <div className="card-body p-4">
                
                {/* URL Input */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark mb-3">
                    URL do Vídeo do YouTube
                  </label>
                  <div className="position-relative">
                    <input
                      type="url"
                      className={`form-control form-control-lg ${isValidUrl ? 'is-valid' : url ? 'is-invalid' : ''}`}
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={url}
                      onChange={handleUrlChange}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e9ecef',
                        paddingLeft: '50px',
                        fontSize: '16px'
                      }}
                    />
                    <Youtube 
                      size={20} 
                      className="position-absolute text-muted"
                      style={{
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    />
                    {isValidUrl && (
                      <CheckCircle 
                        size={20} 
                        className="position-absolute text-success"
                        style={{
                          right: '15px',
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    )}
                    {url && !isValidUrl && (
                      <AlertCircle 
                        size={20} 
                        className="position-absolute text-danger"
                        style={{
                          right: '15px',
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    )}
                  </div>
                  {url && !isValidUrl && (
                    <div className="form-text text-danger mt-2">
                      Por favor, insira uma URL válida do YouTube
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <button
                  className={`btn btn-lg w-100 d-flex align-items-center justify-content-center ${
                    isDownloading ? 'btn-secondary' : 'btn-primary'
                  }`}
                  onClick={handleDownload}
                  disabled={!isValidUrl || isDownloading}
                  style={{
                    borderRadius: '12px',
                    height: '56px',
                    background: isDownloading 
                      ? '#6c757d' 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isDownloading ? (
                    <>
                      <div 
                        className="spinner-border spinner-border-sm me-2" 
                        role="status"
                        style={{ width: '20px', height: '20px' }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Download size={20} className="me-2" />
                      Baixar Vídeo
                    </>
                  )}
                </button>

                {/* Download Result */}
                {downloadResult && (
                  <div className={`alert ${downloadResult.success ? 'alert-success' : 'alert-danger'} mt-4`} style={{ borderRadius: '12px' }}>
                    {downloadResult.success ? (
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <CheckCircle size={20} className="me-2" />
                          <strong>Download Pronto!</strong>
                        </div>
                        <div className="small">
                          <div><strong>Título:</strong> {downloadResult.title}</div>
                          <div><strong>Duração:</strong> {downloadResult.duration}</div>
                          <div><strong>Qualidade:</strong> {downloadResult.quality}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <AlertCircle size={20} className="me-2" />
                        <span>{downloadResult.error}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Info */}
                <div className="mt-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
                  <small className="text-muted d-block">
                    <strong>Como usar:</strong>
                  </small>
                  <small className="text-muted">
                    1. Cole a URL do vídeo do YouTube<br />
                    2. Clique em "Baixar Vídeo"<br />
                    3. Aguarde o processamento e download
                  </small>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <small className="text-white opacity-75">
                Feito com ❤️ para facilitar seus downloads
              </small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
