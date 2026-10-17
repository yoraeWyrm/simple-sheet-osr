export type DummySheet = {
    id: number;
    name: string;
    notes: string;
    image?: string;
    sections: Array<DummySheetSection>;
}

export type DummySheetSection = {
    id: number;
    name: string;
    // "weight" = seção de peso (item, quantidade, peso unitário). Ausente = seção comum.
    kind?: "weight";
    unit?: string;
    limit?: string;
    stats: Array<DummySheetStats>;
}

export type DummySheetStats = {
    id: number;
    name: string;
    // Em seções comuns é o valor do campo. Em seções de peso é o peso de cada unidade.
    value: string;
    // Só em seções de peso.
    qty?: string;
}
