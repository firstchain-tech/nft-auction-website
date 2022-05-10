import type { MenuListType as ListType } from '@/common/data.d'

/* eslint-disable */
export const setListInfoSwitch = () => {
  let list1: ListType[] = [
    {
      name: '我们能做的',
      enName: 'What we can do',
      key: '1',
      index: 0,
      url: '',
      childList: [
        {
          name: '元',
          title: '元起无界，人人都是元宇宙',
          url: '',
          enName: 'Meta',
          enTitle: 'Since the Meta is unbounded, everyone belongs to the Metaverse',
        },
        { name: '铸造所', title: '把区块链想象力NFT可视化', url: '', enName: 'Manufactory', enTitle: 'Visualize blockchain NFT' },
        { name: '连接', title: '认识Web3的顶级开发人员', url: '/link', enName: 'Connect', enTitle: 'Meet the top developers of Web3' },
        { name: '部落', title: '支持有意义的开源项目', url: '', enName: 'Tribe', enTitle: 'Support meaningful open-source projects' },
        { name: 'DAO', title: '参与自组织的notDAO社区', url: '', enName: 'DAO', enTitle: 'Participate in self-organized notDao community' },
      ],
    },
    {
      name: '产品',
      key: '2',
      url: '',
      index: 1,
      enName: 'Product',
      childList: [
        {
          name: 'DAO捐助',
          title: '元起无界，聚沙成塔',
          url: '/donate',
          enName: 'Dao donation',
          enTitle: 'The Meta is unbounded, many littles make a mickle',
          childList: [
            { name: '召唤共识', url: '', enName: 'Summon consensus' },
            { name: '响应捐助', url: '', enName: 'Respond to the  appeal for contributions' },
            { name: '获得LP', url: '', enName: 'Get LP' },
            { name: '开源众筹', url: '', enName: 'Open source crowdfunding' },
            { name: '加入订阅', url: '', enName: 'Subscribe' },
          ],
        },
        {
          name: 'notAI-NFT实验室',
          title: '探索元宇宙可视化开发的AI实验',
          url: '/laboratory',
          enName: 'notAl-NFT laboratory',
          enTitle: 'Explore the AI experiment of visual development of meta universe',
          childList: [
            { name: '探索实验室', url: '', enName: 'Explore Laboratory' },
            { name: 'NFT交易所', url: '', enName: 'NFT Trading Floor' },
            { name: '参与其中', url: '', enName: 'Get involved in' },
          ],
        },
        {
          name: '无界合约',
          title: '自组织的规则秩序呈现能力',
          url: '',
          enName: 'Unbounded contract',
          enTitle: 'Presentation ability of rules and order of self organization',
          childList: [
            { name: '期待部署', url: '', enName: 'Expect the arrangement' },
            { name: '开放的技术社区', url: '', enName: 'Open technology community' },
          ],
        },
        {
          name: 'not工具包',
          title: '了解工具包并获得奖励',
          url: '/tool',
          enName: 'notkit',
          enTitle: 'Learn about the kit and get rewards',
          childList: [
            { name: 'SocialFi组件', url: '/tool#socialfi', enName: 'SocialFi components' },
            { name: 'DAO组件', url: '/tool#notdao', enName: 'DAO components' },
            { name: '任务奖励', url: '', enName: 'Reward' },
          ],
        },
        {
          name: 'DAO广场',
          title: '自由DAO的聚集地，分享DAO',
          url: '',
          enName: 'Dao Plaza',
          enTitle: 'Free Dao gathering place, sharing Dao',
          childList: [
            { name: '广场', url: '', enName: 'Plaza' },
            { name: '部落', url: '', enName: 'Tribe' },
          ],
        },
        {
          name: '荣誉',
          title: '表达对彼此的欣赏',
          url: '',
          enName: 'Honor',
          enTitle: 'Show appreciation to each other',
          childList: [
            { name: '探索荣誉', url: '', enName: 'Explore honor' },
            { name: '社区荣誉', url: '', enName: 'Community honor' },
            { name: '关于荣誉', url: '', enName: 'About honor' },
          ],
        },
        {
          name: 'DAO核心',
          title: '以Web3为中心，以社区为中心的自组织',
          url: '',
          enName: 'Dao core',
          enTitle: 'Self organization centered on Web3 and the community',
          childList: [{ name: '探索DAO', url: '', enName: 'Explore DAO' }],
        },
      ],
    },
    {
      name: '部落',
      key: '3',
      index: 2,
      url: '',
      enName: 'Tribe',
      childList: [
        { name: '排行榜', title: '顶级开发人员排行榜', url: '', enName: 'Ranking List', enTitle: 'Ranking list of top developers' },
        {
          name: 'DAO广场',
          title: '看看DAO社区发生了什么',
          url: '',
          enName: 'DAO Plaza',
          enTitle: `Take a look at what's happening in the Dao community`,
        },
        {
          name: '社区论坛',
          title: '提出问题，加入共识对话',
          url: '',
          enName: 'Community Forum',
          enTitle: 'Ask questions and join the consensus conversation',
        },
        {
          name: '治理论坛',
          title: '我来做主，决定平台的未来',
          url: '',
          enName: 'Govern the Forum',
          enTitle: 'I will decide the future of this place',
        },
      ],
    },
    {
      name: '组织',
      key: '4',
      index: 3,
      url: '',
      enName: 'Organization',
      childList: [
        { name: '关于', title: '', url: '', enName: 'About', enTitle: '' },
        { name: '使命', title: '', url: '/mission', enName: 'Mission', enTitle: '' },
        { name: '结果', title: '', url: '', enName: 'Result', enTitle: '' },
        { name: '博客', title: '', url: '', enName: 'Blog', enTitle: '' },
        { name: '工作', title: '', url: '', enName: 'Work', enTitle: '' },
        { name: '支持', title: '', url: '', enName: 'Support', enTitle: '' },
      ],
    },
  ]

  let list: ListType[] = [
    {
      name: '首页',
      key: '0',
      index: 0,
      url: '/home',
      enName: 'Home',
    },
    {
      name: '交易大厅',
      key: '1',
      index: 1,
      url: '',
      enName: 'Market',
    },
    {
      name: '菜单一',
      key: '2',
      index: 2,
      url: '',
      enName: 'Menu One',
    },
    {
      name: '菜单二',
      key: '3',
      index: 3,
      url: '',
      enName: 'Menu Two',
    },
    {
      name: '菜单三',
      key: '4',
      index: 4,
      url: '',
      enName: 'Menu Three',
    },
    {
      name: '菜单四',
      key: '5',
      index: 5,
      url: '',
      enName: 'Menu Four',
    },
    {
      name: '菜单五',
      key: '6',
      index: 6,
      url: '',
      enName: 'Menu Five',
    },
  ]

  return { list, singleMen: true }
}

/* eslint-enable */
