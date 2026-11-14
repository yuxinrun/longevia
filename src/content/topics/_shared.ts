import type { Reference } from '@/lib/types';

/**
 * Verifiable reference entry points used across topic pages.
 * Only real publications, guidelines and official institutional portals are listed.
 * Where a specific edition/ISBN could not be verified, the citation says so explicitly.
 */
export const REF = {
  hallmarks2013: {
    citation: 'López-Otín C, et al. The Hallmarks of Aging. Cell. 2013;153(6):1194–1217.',
    year: 2013,
    url: 'https://doi.org/10.1016/j.cell.2013.05.039',
    note: '衰老机制研究的经典框架论文；框架本身是组织研究的方式，不是因果清单。',
  },
  hallmarks2023: {
    citation: 'López-Otín C, et al. Hallmarks of Aging: An Expanding Universe. Cell. 2023;186(2):243–278.',
    year: 2023,
    url: 'https://doi.org/10.1016/j.cell.2022.11.004',
    note: '对 2013 框架的扩展与更新；部分条目仍存在归类争议。',
  },
  geroscience: {
    citation: 'Kennedy BK, et al. Geroscience: Linking Aging to Chronic Disease. Cell. 2014;159(4):709–713.',
    year: 2014,
    url: 'https://doi.org/10.1016/j.cell.2014.10.039',
    note: '阐述衰老生物学与慢性病风险之间关系的综述性论文。',
  },
  telomereLancet: {
    citation: 'Blackburn EH, Epel ES, Lin J. Human telomere biology: A contributory and interactive factor in aging, disease risks, and protection. The Lancet. 2015;385(9964):478–491.',
    year: 2015,
    url: 'https://doi.org/10.1016/S0140-6736(14)61388-3',
    note: '端粒生物学综述，强调端粒是风险相关因素而非寿命计时器。',
  },
  horvathClock: {
    citation: 'Horvath S. DNA methylation age of human tissues and cell types. Genome Biology. 2013;14:R115.',
    year: 2013,
    url: 'https://doi.org/10.1186/gb-2013-14-10-r115',
    note: '表观遗传时钟的奠基性方法学论文；后续算法众多且结论不完全一致。',
  },
  whoActivity: {
    citation: 'World Health Organization. WHO Guidelines on Physical Activity and Sedentary Behaviour. 2020.',
    year: 2020,
    url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
    note: '群体层面的公共卫生指南，不是个体化运动处方。',
  },
  whoHealthyAgeing: {
    citation: 'World Health Organization. Decade of Healthy Ageing: Baseline Report / Global strategy and action plan. 2020.',
    year: 2020,
    url: 'https://www.who.int/initiatives/decade-of-healthy-ageing',
    note: '以功能能力为核心理解健康老龄化的机构框架。',
  },
  dietaryCN: {
    citation: '中国营养学会. 《中国居民膳食指南（2022）》. 人民卫生出版社.',
    year: 2022,
    url: 'https://www.cnsoc.org/',
    note: '中国居民膳食的权威指南；具体条目请以中国营养学会官方发布为准。',
  },
  nia: {
    citation: 'National Institute on Aging (NIA). Aging and Health 专题资料.',
    url: 'https://www.nia.nih.gov/health',
    note: '官方健康教育资料，持续更新，不等同于系统综述。',
  },
  niaSleep: {
    citation: 'National Institute on Aging (NIA). Sleep and Older Adults 专题资料.',
    url: 'https://www.nia.nih.gov/health/sleep',
    note: '官方睡眠健康教育页面，持续更新。',
  },
  pubmed: {
    citation: 'U.S. National Library of Medicine. PubMed 文献检索平台.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
    note: '用于核查原始研究与 DOI，检索入口本身不是研究结论。',
  },
  cochrane: {
    citation: 'Cochrane Library. 系统综述数据库.',
    url: 'https://www.cochranelibrary.com/',
    note: '系统综述与 Meta 分析的权威检索平台；结论以具体综述为准。',
  },
  acsm: {
    citation: 'American College of Sports Medicine (ACSM). 运动指南与立场声明.',
    url: 'https://www.acsm.org/',
    note: '专业学会资源，具体推荐以最新版官方文件为准。',
  },
  clinicalTrials: {
    citation: 'U.S. National Library of Medicine. ClinicalTrials.gov 临床试验注册平台.',
    url: 'https://clinicaltrials.gov/',
    note: '注册信息只说明研究计划或进行状态，不代表已有疗效结论。',
  },
  cdc: {
    citation: '中国疾病预防控制中心. 慢性病与健康生活方式健康教育资源.',
    url: 'https://www.chinacdc.cn/',
    note: '国内权威公共卫生机构，页面持续更新。',
  },
} satisfies Record<string, Reference>;

export const TOPIC_UPDATED = '2026-11-01';

/** Common safety note appended to action lists on topic pages. */
export const SAFETY_NOTE = '如有慢性病、正在用药或出现症状，请先咨询专业医疗人员，再调整运动、饮食或补剂方案。';
