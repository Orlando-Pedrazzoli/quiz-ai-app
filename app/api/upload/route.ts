import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/pdf-utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }

    // Valida tipo e tamanho
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Apenas arquivos PDF são permitidos' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 10MB' },
        { status: 400 }
      );
    }

    // Converte para buffer e extrai texto
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const text = await extractTextFromPDF(buffer);

    if (!text || text.trim().length < 100) {
      return NextResponse.json(
        { error: 'Não foi possível extrair texto suficiente do PDF' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      text,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error: any) {
    console.error('Erro ao processar PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar arquivo' },
      { status: 500 }
    );
  }
}
