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
                            {text: '搜索excel内容', link: '/frontend/javascript/findWordInExcel'},
                            {text: '移动端适配方案', link: '/frontend/javascript/移动端适配方案'},
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
                            {text: '日常script', link: '/backend/nodejs/日常script'},
                            {text: '进程和线程', link: '/backend/nodejs/进程和线程'},
                        ]
                    },
                ]
            },
            {
                text: 'NetWork',
                collapsed: false,
                items:[
                    {text: 'cookie', link: '/network/cookie'},
                    {text: 'JWT', link: '/network/JWT'},
                    {text: 'CORS跨域', link: '/network/CORS跨域'},
                    {text: 'XSS攻击和防御', link: '/network/XSS攻击和防御'},
                    {text: 'CSRF攻击和防御', link: '/network/CSRF攻击和防御'},
                    {text: '网络面试题', link: '/network/网络面试题'},
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
