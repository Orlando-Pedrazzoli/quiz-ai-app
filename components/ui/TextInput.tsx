'use client';

import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Cole seu texto aqui...'}
        className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-none"
        maxLength={50000}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>Mínimo: 100 caracteres</span>
        <span>{value.length} / 50.000</span>
      </div>
    </div>
  );
}
