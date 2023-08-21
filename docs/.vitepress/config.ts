import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Evan's Site",
    description: "personal technical learning site",
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Front End', link: '/frontend/index'},
            {text: 'Back End', link: '/backend/index'}
        ],

        sidebar: [
            {
                text: 'Front End',
                collapsed: false,
                items: [
                    {
                        text: 'html', items: [
                            {text: 'html面试', link: '/frontend/html/html面试'},
                        ]
                    },
                    {
                        text: 'css', items: [
                            {text: 'css面试', link: '/frontend/css/css面试'},
                        ]
                    },
                    {
                        text: 'javascript', items: [
                            {text: 'javascript面试', link: '/frontend/javascript/javascript面试'},
                            {text: '手写Promise', link: '/frontend/javascript/手写Promise'},
                            {text: '图片转base64', link: '/frontend/javascript/image2base64'},
                        ],
                    },
                ]
            },
            {
                text: 'Back End',
                collapsed: false,
                items: [
                    {
                        text: 'java相关', items: [
                            {text: 'java基础', link: '/backend/java/java基础'},
                        ]
                    },
                    {
                        text: 'nodejs相关', items: [
                            {text: '日常script', link: '/backend/nodejs/日常script'}
                        ]
                    },
                ]
            }
        ],
        search: {
            provider: 'local'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/Evan-liu-1018/evan-site'}
        ]
    }
})
