import type { WebsiteResource } from '@/lib/types';

/**
 * Official institutional entry links only. `verified: false` means the specific
 * organisation domain or programme path could not be confirmed here — the UI
 * labels those cards and asks the reader to check before citing.
 */
export const websiteResources: WebsiteResource[] = [
  {
    id: 'w1', name: 'National Institute on Aging', en: 'NIA', region: '美国', orgType: '政府机构 / 国立研究所',
    fields: ['衰老研究', '老年健康', '认知与睡眠'], summary: '美国国立卫生研究院下属机构，资助并发布衰老与老年健康研究与健康教育资料。',
    recommended: '面向公众的老年健康专题、研究资助信息与临床试验资料。', link: 'https://www.nia.nih.gov/',
    audience: '研究者、临床人员与普通读者', authority: '国家级研究机构，资料经专业审阅并持续更新。',
    limitations: '以美国人群与医疗体系为背景；健康教育页面不等于系统综述。', verified: true,
  },
  {
    id: 'w2', name: 'National Institutes of Health', en: 'NIH', region: '美国', orgType: '政府机构',
    fields: ['生物医学研究', '公共卫生'], summary: '美国主要生物医学研究资助与监管机构，提供跨领域研究信息与健康资料。',
    recommended: '研究资助数据库、健康信息专题与新闻稿（新闻稿不等于研究结论）。', link: 'https://www.nih.gov/',
    audience: '研究者与希望查证研究来源的读者', authority: '国家级机构，原始研究信息可追溯。',
    limitations: '内容庞大，需区分机构新闻、科普资料与同行评审论文。', verified: true,
  },
  {
    id: 'w3', name: 'World Health Organization', en: 'WHO', region: '国际组织', orgType: '国际公共卫生机构',
    fields: ['健康老龄化', '身体活动', '慢性病预防'], summary: '发布全球公共卫生指南、健康统计与健康老龄化行动框架。',
    recommended: '身体活动指南、健康老龄化十年框架与全球健康统计数据。', link: 'https://www.who.int/',
    audience: '政策研究者、公共卫生从业者与普通读者', authority: '国际权威指南与统计来源。',
    limitations: '群体层面建议，需结合本地指南与个体情况使用。', verified: true,
  },
  {
    id: 'w4', name: 'National Institute for Health and Care Research', en: 'NIHR', region: '英国', orgType: '政府研究资助机构',
    fields: ['临床研究', '证据综合'], summary: '英国国家健康与照护研究所，资助临床研究并发布面向公众的证据摘要。',
    recommended: '证据摘要与患者可理解的研究解读。', link: 'https://www.nihr.ac.uk/',
    audience: '临床人员与希望理解研究质量的读者', authority: '国家级临床研究资助与证据传播机构。',
    limitations: '以英国医疗体系为背景。', verified: true,
  },
  {
    id: 'w5', name: 'PubMed', region: '美国 / 国际', orgType: '文献检索平台',
    fields: ['生物医学文献', 'DOI 核验'], summary: '美国国家医学图书馆维护的生物医学文献检索平台，可核查论文、作者、期刊与 DOI。',
    recommended: '核验本站引用的原始研究与查找系统综述。', link: 'https://pubmed.ncbi.nlm.nih.gov/',
    audience: '研究者与所有希望追溯原始文献的读者', authority: '权威文献索引，但收录不等于结论正确。',
    limitations: '检索入口本身不是研究结论；需阅读原文并判断研究设计。', verified: true,
  },
  {
    id: 'w6', name: 'Cochrane Library', en: 'Cochrane', region: '国际', orgType: '系统综述数据库',
    fields: ['系统综述', 'Meta 分析', '循证医学'], summary: '以严格方法学著称的系统综述与 Meta 分析数据库。',
    recommended: '查询干预效果的证据综合与偏倚风险评估。', link: 'https://www.cochranelibrary.com/',
    audience: '临床人员、研究者与进阶读者', authority: '证据层级中位于较高位置。',
    limitations: '部分综述需订阅；结论随新研究更新。', verified: true,
  },
  {
    id: 'w7', name: 'Nature Aging', region: '国际', orgType: '同行评审期刊',
    fields: ['衰老生物学', '转化研究'], summary: '聚焦衰老机制与年龄相关疾病的同行评审期刊。',
    recommended: '跟踪衰老生物学的高质量原始研究与综述。', link: 'https://www.nature.com/nataging/',
    audience: '研究者与具备背景知识的读者', authority: '同行评审期刊，但仍需区分研究类型。',
    limitations: '部分内容需订阅；期刊新闻与评论不等于研究结论。', verified: true,
  },
  {
    id: 'w8', name: 'Cell', region: '国际', orgType: '同行评审期刊',
    fields: ['生命科学', '衰老机制框架'], summary: '生命科学领域高水平同行评审期刊，发表过多篇衰老机制框架综述。',
    recommended: '查阅 Hallmarks of Aging 系列框架原文。', link: 'https://www.cell.com/',
    audience: '研究者与进阶读者', authority: '同行评审期刊，机制框架论文影响广泛。',
    limitations: '框架综述仍需结合后续研究修订；不等同于临床指南。', verified: true,
  },
  {
    id: 'w9', name: 'The Lancet Healthy Longevity', region: '国际', orgType: '同行评审期刊',
    fields: ['健康长寿', '临床与公共卫生'], summary: '聚焦健康老龄化与长寿研究的同行评审期刊。',
    recommended: '跟踪临床与公共卫生视角的长寿研究。', link: 'https://www.thelancet.com/journals/lanhl/home',
    audience: '临床与公共卫生研究者', authority: '同行评审期刊。',
    limitations: '期刊评论、社论与原始研究需区分。', verified: true,
  },
  {
    id: 'w10', name: 'Buck Institute for Research on Aging', region: '美国', orgType: '非营利研究机构',
    fields: ['衰老生物学', '基础研究'], summary: '专注衰老与年龄相关疾病机制研究的独立研究所。',
    recommended: '了解衰老基础研究的机构方向与研究新闻。', link: 'https://www.buckinstitute.org/',
    audience: '研究者与关注前沿方向的读者', authority: '专业研究机构。',
    limitations: '机构新闻稿常介绍早期研究，不代表临床应用证据。', verified: true,
  },
  {
    id: 'w11', name: 'Stanford Center on Longevity', region: '美国', orgType: '大学研究中心',
    fields: ['长寿研究', '行为与社会视角'], summary: '从行为、设计、政策与技术角度研究长寿与全生命周期健康的跨学科中心。',
    recommended: '了解行为设计与全生命周期视角。', link: 'https://longevity.stanford.edu/',
    audience: '政策研究者与普通读者', authority: '大学下属研究中心。',
    limitations: '观点性内容较多，需与原始研究区分。', verified: true,
  },
  {
    id: 'w12', name: 'Harvard T.H. Chan School of Public Health', region: '美国', orgType: '大学 / 公共卫生学院',
    fields: ['营养', '流行病学', '公共卫生'], summary: '提供营养、运动与慢性病预防的循证健康资料与研究成果。',
    recommended: '营养来源（The Nutrition Source）等公众教育资料。', link: 'https://www.hsph.harvard.edu/',
    audience: '普通读者与公共卫生从业者', authority: '知名公共卫生学院。',
    limitations: '公众教育资料不是临床指南，需结合本地饮食背景。', verified: true,
  },
  {
    id: 'w13', name: 'American College of Sports Medicine', en: 'ACSM', region: '美国 / 国际', orgType: '专业学会',
    fields: ['运动医学', '运动处方'], summary: '发布运动测试、运动处方与身体活动相关的立场声明与指南。',
    recommended: '查阅运动指南与立场声明的最新版本。', link: 'https://www.acsm.org/',
    audience: '运动健康从业者与进阶读者', authority: '国际性专业学会。',
    limitations: '部分文件需会员权限；具体推荐以最新版为准。', verified: true,
  },
  {
    id: 'w14', name: 'NIA 研究资源与临床试验信息', region: '美国', orgType: '政府研究资源入口',
    fields: ['研究资助', '临床试验', '数据资源'], summary: 'NIA 提供的研究项目、数据库与老年相关临床试验信息入口。',
    recommended: '查找官方研究资源与参与研究的信息。', link: 'https://www.nia.nih.gov/research',
    audience: '研究者与希望了解试验信息的读者', authority: '国家级机构官方栏目。',
    limitations: '注册与资助信息不代表已有结果。', verified: true,
  },
  {
    id: 'cn1', name: '国家卫生健康委员会', region: '中国', orgType: '政府机构',
    fields: ['卫生健康政策', '慢性病防控', '官方报告'], summary: '发布国家卫生健康政策、统计公报、居民营养与慢性病状况报告等官方资料。',
    recommended: '查阅国内权威健康统计与政策文件。', link: 'https://www.nhc.gov.cn/',
    audience: '普通读者、公共卫生从业者与政策研究者', authority: '国家级主管部门。',
    limitations: '站内栏目路径可能调整，建议使用站内检索；政策文件不是个体化医疗建议。', verified: true,
  },
  {
    id: 'cn2', name: '中国疾病预防控制中心', en: 'China CDC', region: '中国', orgType: '国家级公共卫生机构',
    fields: ['慢性病', '营养与健康', '流行病学'], summary: '开展疾病监测、慢病防控与健康教育，发布监测数据与科普资料。',
    recommended: '国内慢性病与危险因素监测资料。', link: 'https://www.chinacdc.cn/',
    audience: '公共卫生从业者与普通读者', authority: '国家级疾控机构。',
    limitations: '监测数据为群体描述，不用于个人风险预测。', verified: true,
  },
  {
    id: 'cn3', name: '中国营养学会', en: 'CNS', region: '中国', orgType: '全国性专业学会',
    fields: ['膳食指南', '营养学'], summary: '组织编制《中国居民膳食指南》，发布营养学共识与科普资料。',
    recommended: '《中国居民膳食指南》及膳食营养素参考摄入量相关资料。', link: 'https://www.cnsoc.org/',
    audience: '普通居民、营养师与研究者', authority: '国内营养学权威专业学会。',
    limitations: '群体指南需结合个体疾病状态调整。', verified: true,
  },
  {
    id: 'cn4', name: '国家体育总局', region: '中国', orgType: '政府机构',
    fields: ['全民健身', '运动健康'], summary: '发布全民健身政策、国民体质监测与科学健身指导资料。',
    recommended: '科学健身与国民体质监测相关资料。', link: 'https://www.sport.gov.cn/',
    audience: '普通读者与体育健康从业者', authority: '国家级体育主管部门。',
    limitations: '面向群体的指导，不替代个体化运动评估。', verified: true,
  },
  {
    id: 'cn5', name: '中国科学院', en: 'CAS', region: '中国', orgType: '国家级科研机构',
    fields: ['生命科学', '衰老研究', '基础研究'], summary: '下属多个生命科学与生物医学研究机构开展衰老及相关基础研究。',
    recommended: '通过机构站点查找衰老、代谢与神经科学方向的研究进展。', link: 'https://www.cas.cn/',
    audience: '研究者与关注国内基础研究的读者', authority: '国家级科研机构。',
    limitations: '机构新闻常介绍早期基础研究，不等于人体临床应用。', verified: true,
  },
  {
    id: 'cn6', name: '中国科学院生物物理研究所', region: '中国', orgType: '科研机构',
    fields: ['衰老生物学', '蛋白质科学', '神经科学'], summary: '开展蛋白质稳态、衰老与神经退行相关基础研究的研究所。',
    recommended: '查阅衰老与蛋白质科学的国内研究进展。', link: 'https://www.ibp.cas.cn/',
    audience: '研究者与进阶读者', authority: '国家级科研机构下属研究所。',
    limitations: '以基础研究为主，成果外推到人体需谨慎。', verified: true,
  },
  {
    id: 'cn7', name: '中华医学会（老年医学相关专业组织入口）', region: '中国', orgType: '全国性专业学会',
    fields: ['老年医学', '临床指南'], summary: '中华医学会及其专科分会发布多类临床指南与专家共识，可作为查找国内老年医学专业组织的官方入口。',
    recommended: '检索老年医学、慢病管理相关的指南与共识。', link: 'https://www.cma.org.cn/',
    audience: '临床人员与研究者', authority: '全国性医学专业学会。',
    limitations: '本站未核验到「中国老年医学学会」「中国老年学和老年医学学会」的独立官方域名，此处提供中华医学会官方入口；具体学会信息请以官方公告为准。',
    verified: false,
  },
  {
    id: 'cn8', name: '国内高校老年医学 / 营养学 / 生命科学研究平台', region: '中国', orgType: '高校研究平台（导航入口）',
    fields: ['老年医学', '营养学', '生命科学'], summary: '国内多所高校设有老年医学、营养与生命科学相关研究平台，具体机构与项目随学校设置变化。',
    recommended: '通过高校官方站点与科研机构目录查找具体团队与发表成果。', link: 'https://www.moe.gov.cn/',
    audience: '研究者与希望查找国内研究团队的读者', authority: '此处为教育部官方门户，用于查找高校与学科信息。',
    limitations: '并非单一研究机构官网；本站未核验各高校具体平台页面，引用前请通过高校官网核实。',
    verified: false,
  },
];

export const websiteVerificationNote =
  '外链核验说明：标注「官方入口」的资源，链接指向机构官方域名首页或官方栏目；标注「待核验」的资源，本站未能确认其独立官方域名，因此提供上级主管机构或专业学会的官方入口，并提示引用前核实。';
