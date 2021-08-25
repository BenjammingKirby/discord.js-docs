export type EmbedTypes = "rich" | "image" | "video" | "gifv" | "article" | "link";
export interface MessageEmbed {
    title?: string;
    type?: EmbedTypes;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: MessageEmbedFooter;
    image?: MessageEmbedImage;
    thumbnail?: MessageEmbedThumbnail;
    video?: MessageEmbedVideo;
    provider?: MessageEmbedProvider;
    author?: MessageEmbedAuthor;
    fields?: Array<MessageEmbedField>;
}

export interface MessageEmbedProvider {
    url?: string;
    name?: string;
}

export interface MessageEmbedAuthor {
    url?: string;
    name?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface MessageEmbedThumbnail {
    width?: number;
    url?: string;
    proxy_url?: string;
    height?: number;
}
export interface MessageEmbedVideo {
    width?: number;
    url?: string;
    proxy_url?: string;
    height?: number;
}
export interface MessageEmbedImage {
    width?: number;
    url?: string;
    proxy_url?: string;
    height?: number;
}
export interface MessageEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface MessageEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
