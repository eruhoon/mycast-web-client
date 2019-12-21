import { StreamDto } from './StreamDto';

export class MockStream {
    public static MOCK_STREAM_OBJECT = {
        local: [
            {
                result: true,
                platform: 'local',
                keyid: 'faudhwang',
                icon: 'https://i.imgur.com/tUwlQ3G.jpg?1',
                nickname: 'Faud(자유인)',
                thumbnail: 'http://i.imgur.com/VZHm2q0.png',
                onair: true,
                title: 'Faud(자유인)',
                description: 'Faud(자유인)의 방송 [공용채널]',
                url: 'http://mycast.xyz/home/stream/local/18}',
                viewer: 0
            },
            {
                result: true,
                platform: 'local',
                keyid: 'gksmf1677',
                icon: 'https://i.imgur.com/KUbNw6O.gif',
                nickname: 'ᎷᏋᎶᏬᎷᎥᏁ',
                thumbnail: 'https://i.imgur.com/5hgzZcl.gif',
                onair: true,
                title: 'ᎷᏋᎶᏬᎷᎥᏁ',
                description: 'ᎷᏋᎶᏬᎷᎥᏁ의 방송 [공용채널]',
                url: 'http://mycast.xyz/home/stream/local/95}',
                viewer: 5
            },
            {
                result: true,
                platform: 'local',
                keyid: 'eruhoon',
                icon: 'https://i.imgur.com/tXiHAIc.gif',
                nickname: '시구르나',
                thumbnail: 'https://i.imgur.com/5ndSAT7.jpg',
                onair: true,
                title: '시구르나',
                description: '시구르나의 방송 [공용채널]',
                url: 'http://mycast.xyz/home/stream/local/9}',
                viewer: 1
            }],

        external: [
            {
                result: true,

                platform: 'afreeca',
                keyid: 'horidda',
                icon: 'http://stimg.afreeca.com/LOGO/ho/horidda/horidda.jpg',
                nickname: '호진LEE',
                title: '리호진',
                description: '[생]호진 " 모데카이저 승률 100% ^^ 잡음 " 신입 MID 다이아 켠왕 3일차 LOL',
                url: 'http://play.afreeca.com/horidda/embed',
                thumbnail: 'http://liveimg.afreecatv.co.kr/219588494.jpg?1576902110369',
                onair: true,
                viewer: 759
            },
            {
                result: true,
                platform: 'kakaotv',
                keyid: '2669634',
                icon: 'https://t1.daumcdn.net/thumb/R200x0/?fname=http%3A%2F%2Fimg1.daumcdn.net%2Fkakaotv%2FCHANNEL%2F2669634%2Fprofile%2F20170221223702',
                nickname: 'YTN',
                thumbnail: 'https://thumb.kakaocdn.net/dn/live_image/snapshot/873179579b985817_ss.jpg?t=157690209',
                onair: true,
                title: 'YTN',
                description: 'YTN 데일리 라이브',
                url: 'http://web-tv.kakao.com//embed/player/livelink/5386012',
                viewer: '1112'
            },
            {
                result: true,
                platform: 'twitch',
                keyid: 'beyondthesummit',
                icon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f170344d-7a60-47fa-8be6-a74e803fcf12-profile_image-300x300.jpg',
                nickname: 'BeyondTheSummit',
                title: 'BeyondTheSummit',
                description: 'RERUN: TNC Predator vs Geek Fam Game 2 - DreamLeague S13 SEA Qualifiers: Group Stage',
                url: 'https://player.twitch.tv/?channel=beyondthesummit',
                onair: true,
                viewer: 562,
                thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_beyondthesummit-200x150.jpg?1576902101566'
            },
            {
                result: true,
                platform: 'twitch',
                keyid: 'jmjdoc',
                icon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/adb1fcda-ef31-4c66-9ce1-d89e5fdbaf9a-profile_image-300x300.png',
                nickname: '칸데르니아',
                title: '칸데르니아',
                description: '림왈도',
                url: 'https://player.twitch.tv/?channel=jmjdoc',
                onair: true,
                viewer: 797,
                thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_jmjdoc-200x150.jpg?1576902101566'
            },
            {
                result: true,
                platform: 'twitch',
                keyid: 'jyw_zz',
                icon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/b40e53f6-cb01-46e5-8db4-95b044e4ed0c-profile_image-300x300.jpeg',
                nickname: '영우쿤',
                title: '영우쿤',
                description: 'ジーナ ボイド',
                url: 'https://player.twitch.tv/?channel=jyw_zz',
                onair: true,
                viewer: 89,
                thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_jyw_zz-200x150.jpg?1576902101566'
            },
            {
                result: true,
                platform: 'twitch',
                keyid: 'maknoonlol',
                icon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3672c556-07a5-461c-bfdf-743e5e56f98c-profile_image-300x300.jpg',
                nickname: '막눈_',
                title: '막눈_',
                description: '마스터 등반가즈아 탑카르마 서폿템',
                url: 'https://player.twitch.tv/?channel=maknoonlol',
                onair: true,
                viewer: 5,
                thumbnail: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_maknoonlol-200x150.jpg?1576902101566'
            }]
    };

}

