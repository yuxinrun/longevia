/** Structured, actionable plans used by interactive practice and fitness modules. */

export interface TrainingSession {
  name: string; sets: string; reps: string; rest: string;
  intensity: string; alternatives: string[]; safety: string;
}
export interface TrainingPlan {
  id: string; name: string; audience: string; frequency: string; duration: string;
  principle: string; sessions: TrainingSession[]; note: string;
}

export const trainingPlans: TrainingPlan[] = [
  {
    id: 'beginner-2', name: '初学者每周 2 次计划', audience: '零基础、时间有限者', frequency: '每周 2 次，间隔 ≥ 2 天', duration: '30–40 分钟 / 次',
    principle: '先建立动作模式与训练习惯，不追求负荷。',
    note: '连续两周能轻松完成后，再每次小幅增加 1–2 次或轻微加重。',
    sessions: [
      { name: '坐姿站起（可扶靠）', sets: '2 组', reps: '8–12 次', rest: '60–90 秒', intensity: '最后 2 次略费力', alternatives: ['箱式深蹲', '弹力带辅助深蹲'], safety: '膝盖方向与脚尖一致，避免憋气' },
      { name: '靠墙俯卧撑', sets: '2 组', reps: '8–12 次', rest: '60–90 秒', intensity: '动作可控', alternatives: ['斜板俯卧撑', '器械推胸'], safety: '肩部不适时缩小幅度' },
      { name: '弹力带坐姿划船', sets: '2 组', reps: '10–12 次', rest: '60 秒', intensity: '肩胛后收不耸肩', alternatives: ['器械划船', '俯身哑铃划船'], safety: '保持躯干稳定' },
      { name: '臀桥', sets: '2 组', reps: '10–15 次', rest: '60 秒', intensity: '臀部发力', alternatives: ['台阶上步', '罗马尼亚硬拉（轻）'], safety: '腰部不要过度反弓' },
      { name: '站姿提踵', sets: '2 组', reps: '12–15 次', rest: '45 秒', intensity: '缓慢控制', alternatives: ['坐姿提踵'], safety: '扶靠稳固支撑物' },
      { name: '死虫式（简化）', sets: '2 组', reps: '每侧 8 次', rest: '45 秒', intensity: '腰背贴地', alternatives: ['鸟狗式'], safety: '出现腰酸即减小幅度' },
    ],
  },
  {
    id: 'intermediate-3', name: '每周 3 次训练计划', audience: '有 2–3 个月训练基础者', frequency: '每周 3 次（如周一 / 周三 / 周五）', duration: '45 分钟 / 次',
    principle: '按推、拉、下肢分化，逐步增加训练容量。',
    note: '每次只调整一个变量（重量、次数或组数），避免同时大幅加量。',
    sessions: [
      { name: '高脚杯深蹲', sets: '3 组', reps: '8–12 次', rest: '90 秒', intensity: '保留 2 次余力', alternatives: ['杠铃深蹲', '腿举'], safety: '躯干稳定，膝盖不内扣' },
      { name: '哑铃卧推 / 俯卧撑', sets: '3 组', reps: '8–12 次', rest: '90 秒', intensity: '保留 2 次余力', alternatives: ['器械推胸', '弹力带推'], safety: '肩关节有伤史者先评估' },
      { name: '坐姿 / 俯身划船', sets: '3 组', reps: '10–12 次', rest: '75 秒', intensity: '肩胛主动后收', alternatives: ['高位下拉', '弹力带划船'], safety: '避免用惯性甩动' },
      { name: '罗马尼亚硬拉', sets: '3 组', reps: '8–10 次', rest: '90 秒', intensity: '腘绳肌有拉伸感', alternatives: ['臀桥', '壶铃硬拉'], safety: '脊柱中立，重量从轻开始' },
      { name: '哑铃推举（坐姿）', sets: '2 组', reps: '8–10 次', rest: '75 秒', intensity: '不过度挺腰', alternatives: ['弹力带推举'], safety: '肩部不适改为地面推举角度' },
      { name: '平板支撑', sets: '3 组', reps: '20–40 秒', rest: '45 秒', intensity: '质量优先于时长', alternatives: ['死虫式', '侧桥'], safety: '腰部下塌即停止' },
    ],
  },
  {
    id: 'advanced-4', name: '每周 4 次训练计划', audience: '有稳定训练习惯、恢复良好者', frequency: '每周 4 次（上下肢交替）', duration: '45–60 分钟 / 次',
    principle: '上下肢分化，控制总容量并安排 deload 周。',
    note: '每 4–6 周安排一周减量，睡眠不足或疾病期主动降低强度。',
    sessions: [
      { name: '杠铃 / 哑铃深蹲', sets: '4 组', reps: '5–8 次', rest: '2 分钟', intensity: '保留 1–2 次余力', alternatives: ['前蹲', '腿举'], safety: '需掌握动作后再加重量' },
      { name: '硬拉变式', sets: '3 组', reps: '5–6 次', rest: '2 分钟', intensity: '技术动作优先', alternatives: ['壶铃硬拉', '臀推'], safety: '腰背不适立即停止' },
      { name: '卧推 / 双杠臂屈伸', sets: '4 组', reps: '6–10 次', rest: '90 秒', intensity: '肩部稳定', alternatives: ['哑铃卧推'], safety: '建议有保护者或安全架' },
      { name: '引体向上 / 高位下拉', sets: '4 组', reps: '6–10 次', rest: '90 秒', intensity: '避免借力摆动', alternatives: ['弹力带辅助引体'], safety: '肩袖有伤史需评估' },
      { name: '保加利亚分腿蹲', sets: '3 组', reps: '每侧 8 次', rest: '75 秒', intensity: '控制下放', alternatives: ['台阶上步', '弓步走'], safety: '膝盖不适可缩短步幅' },
      { name: '农夫行走', sets: '3 组', reps: '20–30 米', rest: '60 秒', intensity: '躯干不侧倾', alternatives: ['单手提重'], safety: '握力不足时使用助力带' },
    ],
  },
  {
    id: 'home', name: '家庭训练计划', audience: '无器械、空间有限者', frequency: '每周 2–3 次', duration: '20–30 分钟 / 次',
    principle: '用自重与弹力带覆盖全部动作模式，降低启动门槛。',
    note: '一把稳固椅子、一条弹力带即可完成；把训练安排在固定日常线索之后。',
    sessions: [
      { name: '椅子坐姿站起', sets: '3 组', reps: '10–12 次', rest: '60 秒', intensity: '尽量少用手撑', alternatives: ['箱式深蹲'], safety: '椅子靠墙防滑动' },
      { name: '靠墙 / 斜板俯卧撑', sets: '3 组', reps: '8–12 次', rest: '60 秒', intensity: '身体成直线', alternatives: ['标准俯卧撑'], safety: '台面必须稳固' },
      { name: '弹力带划船', sets: '3 组', reps: '12 次', rest: '60 秒', intensity: '肩胛后收', alternatives: ['毛巾等长拉'], safety: '检查弹力带固定点' },
      { name: '弹力带推举', sets: '2 组', reps: '10 次', rest: '60 秒', intensity: '不耸肩', alternatives: ['水瓶推举'], safety: '避免弹回失控' },
      { name: '单腿站（扶靠）', sets: '2 组', reps: '每侧 20 秒', rest: '30 秒', intensity: '稳定优先', alternatives: ['tandem 站立'], safety: '身旁有稳固扶靠物' },
      { name: '臀桥 + 死虫式', sets: '各 2 组', reps: '10–12 次', rest: '45 秒', intensity: '缓慢控制', alternatives: ['鸟狗式'], safety: '腰背不适即降低幅度' },
    ],
  },
  {
    id: 'older-adult', name: '中老年基础力量训练计划', audience: '60 岁以上或体能较弱者', frequency: '每周 2 次，间隔 ≥ 2 天', duration: '20–30 分钟 / 次',
    principle: '功能动作优先、全程有扶靠、强度保守、避免憋气。',
    note: '建议首次训练由康复治疗师或教练评估动作；血压未控制、近期骨折或眩晕者先咨询医生。',
    sessions: [
      { name: '扶靠坐姿站起', sets: '2 组', reps: '6–10 次', rest: '90 秒', intensity: '轻松可控', alternatives: ['抬高坐垫的起坐'], safety: '椅子靠墙，双脚平稳着地' },
      { name: '扶墙提踵', sets: '2 组', reps: '10 次', rest: '60 秒', intensity: '缓慢起落', alternatives: ['坐姿提踵'], safety: '始终扶靠' },
      { name: '弹力带坐姿划船（轻阻力）', sets: '2 组', reps: '8–10 次', rest: '60 秒', intensity: '不憋气', alternatives: ['肩胛后收练习'], safety: '阻力从最轻开始' },
      { name: '扶靠台阶上步', sets: '2 组', reps: '每侧 6–8 次', rest: '60 秒', intensity: '台阶高度 10–15 cm', alternatives: ['原地踏步'], safety: '有人在旁更安全' },
      { name: '单腿站（扶靠）', sets: '2 组', reps: '每侧 10–15 秒', rest: '45 秒', intensity: '不追求时长', alternatives: ['双脚前后站立'], safety: '避免闭眼练习' },
      { name: '坐姿肩颈活动与拉伸', sets: '1 组', reps: '每个动作 5 次', rest: '—', intensity: '无疼痛范围', alternatives: ['温和颈部活动'], safety: '避免快速甩头' },
    ],
  },
];

export interface ExerciseEntry {
  key: string; name: string; illustration: string; pattern: string;
  cues: string[]; mistake: string; alternatives: string[]; safety: string;
}

export const exerciseAtlas: ExerciseEntry[] = [
  { key: 'squat', name: '深蹲', illustration: 'squat', pattern: '下肢蹲', cues: ['髋膝同时屈曲', '膝盖与脚尖方向一致', '脊柱保持自然中立'], mistake: '膝盖内扣或过度前倾', alternatives: ['箱式深蹲', '高脚杯深蹲'], safety: '膝关节伤史者先减小幅度' },
  { key: 'sitToStand', name: '坐姿站起', illustration: 'sitToStand', pattern: '功能性下肢', cues: ['双脚平稳着地', '身体略前倾后发力', '尽量少用手撑'], mistake: '完全靠手臂撑起', alternatives: ['抬高坐垫起坐', '扶靠起坐'], safety: '椅子靠墙防滑动' },
  { key: 'pushUp', name: '俯卧撑', illustration: 'pushUp', pattern: '上肢推', cues: ['身体成直线', '肩胛稳定', '下放可控'], mistake: '塌腰或耸肩', alternatives: ['靠墙俯卧撑', '斜板俯卧撑'], safety: '肩部不适时提高手位' },
  { key: 'row', name: '划船', illustration: 'row', pattern: '上肢拉', cues: ['肩胛主动后收', '躯干稳定', '不用惯性甩动'], mistake: '只用手臂拉、耸肩', alternatives: ['弹力带划船', '器械划船'], safety: '腰背不适改为坐姿' },
  { key: 'overheadPress', name: '哑铃推举', illustration: 'overheadPress', pattern: '上肢推（垂直）', cues: ['核心收紧', '不挺腰', '向上推时正常呼气'], mistake: '过度反弓腰椎', alternatives: ['坐姿推举', '弹力带推举'], safety: '肩袖伤史需专业评估' },
  { key: 'resistanceBand', name: '弹力带训练', illustration: 'resistanceBand', pattern: '拉 / 多模式', cues: ['固定点牢固', '控制回弹', '动作全程有张力'], mistake: '让弹力带快速弹回', alternatives: ['器械划船', '毛巾等长拉'], safety: '每次使用前检查破损' },
  { key: 'briskWalk', name: '快走', illustration: 'briskWalk', pattern: '有氧', cues: ['步频略增', '摆臂自然', '能说话但略喘'], mistake: '一开始就追求速度', alternatives: ['骑行', '椭圆机'], safety: '注意路面与鞋具' },
  { key: 'cycling', name: '骑行', illustration: 'cycling', pattern: '有氧（低冲击）', cues: ['坐垫高度合适', '踏频平稳', '循序渐进'], mistake: '座椅过低造成膝前压力', alternatives: ['固定车', '步行'], safety: '佩戴头盔并遵守交通规则' },
  { key: 'balanceExercise', name: '平衡训练', illustration: 'balanceExercise', pattern: '单腿稳定', cues: ['扶靠稳固支撑', '目视前方定点', '逐步减少支撑'], mistake: '闭眼或站在湿滑地面', alternatives: ['tandem 站立', '双脚前后站'], safety: '有人在旁更安全' },
  { key: 'stretch', name: '拉伸', illustration: 'stretch', pattern: '活动度', cues: ['在无痛范围内', '缓慢呼吸', '不弹震'], mistake: '强行压到疼痛', alternatives: ['动态热身', '泡沫轴'], safety: '急性损伤期避免强拉' },
];

export interface DayTask {
  day: number; phase: number; phaseName: string; theme: string;
  action: string; exercise: string; nutrition: string; sleep: string; tracking: string;
  science: string; safety: string;
}

const phases = [
  { id: 1, name: '建立个人健康基线', exercise: '记录日常活动量，不额外增加训练', nutrition: '照常饮食，只记录三餐大致结构', sleep: '记录入睡与起床时刻', tracking: '体重、腰围、步数、睡眠时长、主观精力' },
  { id: 2, name: '改善日常活动和运动习惯', exercise: '每天一次 10–20 分钟快走；本周安排 2 次短力量入门', nutrition: '保持原有饮食，注意饮水', sleep: '固定起床时间', tracking: '活动分钟数、力量训练次数、步数' },
  { id: 3, name: '改善饮食和睡眠', exercise: '延续快走与 2 次力量训练', nutrition: '每餐加入一份蔬菜与一份优质蛋白，减少含糖饮料', sleep: '固定起床时间 + 晚间降低照度', tracking: '睡眠规律性、蔬菜与蛋白摄入、精力' },
  { id: 4, name: '评估进展并建立长期计划', exercise: '从训练计划中挑选一套可长期执行的方案', nutrition: '回顾哪些饮食调整最容易坚持', sleep: '保留最有效的一项睡眠安排', tracking: '回看 4 周趋势，写下 3 项长期习惯' },
];

const themes = [
  '记录第一天，不改动任何习惯', '测量体重与腰围，注明条件', '观察一天里连续久坐的最长时段', '记录昨晚睡眠与今日精力', '写下自己最想保持的三项日常能力', '看看一周里有哪些自然的活动机会', '整理一个方便记录的位置',
  '每小时起身一次，做 2 分钟活动', '完成 10 分钟快走', '尝试坐姿站起与靠墙俯卧撑', '记录一次力量入门训练', '走一段平时乘车或坐车的路', '完成第二次短力量训练', '回顾本周活动量，不评价好坏',
  '每餐加一份蔬菜', '每餐安排一份优质蛋白', '把含糖饮料换成水或无糖饮品', '固定起床时间（含周末）', '早晨接触自然光 10 分钟', '晚间降低照度，睡前放下屏幕', '记录咖啡因摄入时间',
  '回看四周记录，找出最容易坚持的三件事', '为下周选一套训练计划', '给运动安排一个固定时间线索', '写下忙碌周的最低版本', '设计一次可重复的户外或社交活动', '整理自己的健康指标清单', '为下个月写下不夸张的目标', '把计划变成长期习惯，而不是结束', '保留记录习惯，允许随时重新开始',
];

export const plan30Days: DayTask[] = themes.map((theme, i) => {
  const day = i + 1;
  const phase = day <= 7 ? phases[0] : day <= 14 ? phases[1] : day <= 21 ? phases[2] : phases[3];
  return {
    day, phase: phase.id, phaseName: phase.name, theme,
    action: theme,
    exercise: phase.exercise,
    nutrition: phase.nutrition,
    sleep: phase.sleep,
    tracking: phase.tracking,
    science: day <= 7
      ? '建立基线能减少凭印象判断，让后续变化有可比较的参照；单次数据本身不代表健康状态。'
      : day <= 14
        ? '日常活动与阻力训练对肌肉、代谢和心肺适能有较广泛的人体证据支持，累积量比单次强度更重要。'
        : day <= 21
          ? '膳食质量与作息规律性通过多条通路影响身体状态，规律比短期完美更可持续。'
          : '长期趋势比短期波动更能反映习惯；30 天不用于评估衰老速度或生物年龄变化。',
    safety: '如有慢性病、正在用药、疼痛或眩晕，请先咨询专业医疗人员；任务可跳过或替换，不设强制目标。',
  };
});

export const dailyHabits = [
  { id: 'h1', label: '规律运动', hint: '任意形式的活动都算' },
  { id: 'h2', label: '力量训练', hint: '含自重与弹力带' },
  { id: 'h3', label: '适量有氧活动', hint: '快走、骑行等' },
  { id: 'h4', label: '均衡饮食', hint: '关注整体结构' },
  { id: 'h5', label: '摄入足够蛋白质', hint: '按个人情况判断' },
  { id: 'h6', label: '蔬菜和膳食纤维', hint: '长期多样化' },
  { id: 'h7', label: '规律睡眠', hint: '起床时间稳定' },
  { id: 'h8', label: '户外活动', hint: '光照与走动' },
  { id: 'h9', label: '社交互动', hint: '一次简短交流也算' },
  { id: 'h10', label: '减少久坐', hint: '打断连续静坐' },
];

export const ageGroups = [
  { id: 'a1', range: '30 岁及以下', focus: '健康习惯与风险预防', points: ['建立不吸烟、规律活动与充足睡眠的基础', '避免长期熬夜与极端饮食', '关注体重与血压的长期趋势'] },
  { id: 'a2', range: '30—40 岁', focus: '代谢健康与运动基础', points: ['把有氧与力量训练纳入固定日程', '关注腰围、血脂、血糖与血压', '减少工作相关的连续久坐'] },
  { id: 'a3', range: '40—50 岁', focus: '心血管、肌肉与代谢健康', points: ['按指南安排心血管风险因素评估', '保持每周两次以上阻力训练', '关注睡眠规律性而非只看时长'] },
  { id: 'a4', range: '50—60 岁', focus: '力量、骨骼与身体机能', points: ['重视蛋白质与阻力训练的配合', '根据风险与指南评估骨密度', '加入平衡练习与居家安全检查'] },
  { id: 'a5', range: '60 岁以上', focus: '功能独立、平衡与跌倒预防', points: ['优先维持起坐、步行与提拿能力', '多因素排查跌倒风险（视力、用药、环境）', '保持社会参与与规律活动'] },
];

export const lifestyleGroups = [
  { id: 'l1', name: '久坐办公人群', constraint: '整块时间少、连续静坐长', start: '每小时起身 2 分钟 + 通勤多走一站', note: '不追求午休完整训练' },
  { id: 'l2', name: '长期熬夜人群', constraint: '入睡时间晚、日间疲惫', start: '先固定起床时间并增加晨间光照', note: '不要同时大幅提前入睡与增加运动量' },
  { id: 'l3', name: '缺乏运动人群', constraint: '体能基础弱、容易酸痛', start: '每天 10 分钟快走 + 每周两次 15 分钟力量入门', note: '从坐姿站起与扶靠动作开始' },
  { id: 'l4', name: '有规律运动习惯的人群', constraint: '容易忽视恢复与动作质量', start: '每 4–6 周安排减量周，记录动作质量与睡眠', note: '不要把更多训练等同于更好结果' },
  { id: 'l5', name: '中老年人', constraint: '平衡、骨密度与安全顾虑', start: '扶靠下的力量与平衡练习，强度保守', note: '首次训练建议专业评估' },
  { id: 'l6', name: '经常出差的人群', constraint: '场地与器械不稳定', start: '固定起床时间 + 无器械最小训练', note: '保留连接比维持完整计划更重要' },
  { id: 'l7', name: '家庭照护者', constraint: '时间与精力被他人需求占据', start: '把短暂休息与 5 分钟走动纳入日程', note: '自我照顾是可持续照护的前提' },
];
