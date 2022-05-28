export interface GametagData {
    created_at: string;
    id: number;
    name: string;
    published_at: string;
    updated_at: string;
}

export interface ShareData {
    created_at: string;
    gametag: GametagData[];
    hero: string;
    id:number;
    published_at: string;
    score: number;
    updated_at: string;
    villain: string;
}

export interface SeosData {
    title: string;
    description: string;
    author: string;
    keywords: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
    ogImageWidth: number;
    ogImageHeight: number;
    ogType: string;
    ogUrl: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterUrl: string;
}