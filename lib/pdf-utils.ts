import pdf from 'pdf-parse';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error);
    throw new Error('Falha ao processar PDF');
  }
}

export function validatePDF(file: File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf'];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Apenas arquivos PDF são permitidos');
  }

  if (file.size > maxSize) {
    throw new Error('Arquivo muito grande. Tamanho máximo: 10MB');
  }

  return true;
}

export function validateText(text: string): boolean {
  const minLength = 100; // mínimo de caracteres
  const maxLength = 50000; // máximo de caracteres

  if (text.length < minLength) {
    throw new Error(`O texto deve ter no mínimo ${minLength} caracteres`);
  }

  if (text.length > maxLength) {
    throw new Error(`O texto deve ter no máximo ${maxLength} caracteres`);
  }

  return true;
}
