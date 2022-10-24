/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export function load({ params }) {
  return {
    aromaFilter: [
      { i: 'ea1eec31-474b-4b9f-b44f-5e67d13a430c', mn: 0, mx: 9, n: 'PriceValue', l: 'price/value', v: 8, },
      { i: '9b888fe0-5c64-4e2b-8628-de11bf4fafbb', mn: 0, mx: 9, n: 'ProductionQuality', l: 'production quality', v: 3, },
      { i: 'f7ae7730-4a3d-41a0-a3ed-3c305b83f5de', mn: 0, mx: 9, n: 'Strength', l: 'strength', v: 5, },
      { i: 'a93e29da-ade0-4201-8512-64cb67de781c', mn: 0, mx: 9, n: 'SmokeVolume', l: 'smoke volume', v: 0, },
      { i: '70d74055-d365-4cb4-94c0-d0a97170e97f', mn: 0, mx: 9, n: 'Draw', l: 'draw', v: 0, },
      { i: '22521013-0617-408a-a687-701549e52036', mn: 0, mx: 9, n: 'CombustionBehaviour', l: 'combustion', v: 0, },
      { i: '2f0ae668-f3ff-4d4f-a44d-ed3909165746', mn: 0, mx: 9, n: 'AromaDiversity', l: 'aroma diversity', v: 0, },
      { i: '2d865e0e-e3c7-483b-a973-e972b7dcd617', mn: 0, mx: 9, n: 'AromaStrength', l: 'aroma strength', v: 0, },
    ],
  }
}