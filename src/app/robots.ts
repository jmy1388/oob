import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/api/'],
        },
        sitemap: 'https://oob-psi.vercel.app/sitemap.xml', // 배포 도메인을 모를 경우 나중에 수정 필요
    };
}
