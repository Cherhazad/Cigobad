import type {Level} from "shared";

export const formatLevel = (level: Level) => {
    switch (level) {
        case 'Confirme':
            return 'Confirmé';
        case 'Debutant':
            return 'Débutant';
        case 'Intermediaire':
            return 'Intermédiaire';
        default:
            return level
    }
}

export const formatLevels = (levels: Level[]): string[] => {
    return levels.map(formatLevel)
}