import React from 'react';

type Props = {
  onSelect: (profile: 'frequent' | 'lapsed' | 'new') => void;
};

export function ProfileSelection({ onSelect }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white p-6 gap-5">
      <div className="max-w-xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Quem está usando o app?</h1>
        <p className="text-gray-600 mb-6">Escolha um perfil para receber recomendações personalizadas.</p>

        <div className="grid grid-cols-1 gap-8">
          <button
            onClick={() => onSelect('frequent')}
            className="w-full text-left p-4 bg-red-50 rounded-lg border border-red-100 hover:shadow-md transition mb-4 cursor-pointer"
          >
            <h2 className="font-semibold">Usuário frequente</h2>
            <p className="text-sm text-gray-600 mt-2">Você usa o app sempre — vamos enfatizar "Me Surpreenda", para te manter engajado e mostrar seus favoritos na listagem de restaurantes.</p>
          </button>

          <button
            onClick={() => onSelect('lapsed')}
            className="w-full text-left p-4 bg-yellow-50 rounded-lg border border-yellow-100 hover:shadow-md transition mb-4 cursor-pointer"
          >
            <h2 className="font-semibold">Usuário em pausa</h2>
            <p className="text-sm text-gray-600 mt-2">Mostraremos recomendações empolgantes para trazer você de volta, podendo adicionar cupons personalizados para sua experiência.</p>
          </button>

          <button
            onClick={() => onSelect('new')}
            className="w-full text-left p-4 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold">Usuário novo</h2>
            <p className="text-sm text-gray-600 mt-2">Você está começando — você receberá recomendações personalizadas com os melhores restaurantes do site.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
