'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

interface FileUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
  onError: (error: string) => void;
}

export default function FileUpload({ onTextExtracted, onError }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploadedFile(file);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Erro ao processar arquivo');
        }

        const data = await response.json();
        onTextExtracted(data.text, file.name);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao processar arquivo';
        onError(errorMessage);
        setUploadedFile(null);
      } finally {
        setUploading(false);
      }
    },
    [onTextExtracted, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-blue-50'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-5xl text-gray-400 mb-4" />
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600">Processando arquivo...</p>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {isDragActive ? 'Solte o arquivo aqui' : 'Arraste um PDF ou clique para selecionar'}
              </p>
              <p className="text-sm text-gray-500">Tamanho máximo: 10MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <FiFile className="text-2xl text-green-600" />
            <div>
              <p className="font-medium text-gray-800">{uploadedFile.name}</p>
              <p className="text-sm text-gray-600">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 hover:bg-green-100 rounded-full transition-colors"
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}