export interface MoodleModel {
    id: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isVisible: boolean;

    name: string,
    shortName: string,
    description: string,
    category: number
}
