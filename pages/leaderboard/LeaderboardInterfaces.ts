export interface DataHistoryBattle {
    created_at: string;
    gametag: number;
    hero: string;
    id: number;
    published_at: string;
    score: number;
    updated_at: string;
    villain: string;
}

export interface DataLeaderboards {
    created_at: string;
    id : number;
    leaderboards?: DataHistoryBattle[];
    name: string;
    published_at: string;
    updated_at: string;
}