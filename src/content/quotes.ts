import type { Quote } from '@/lib/types';

/** All entries are original LONGEVIA editorial lines. No scientist quotations are attributed. */
export const quotes: Quote[] = [
  { id: 'q01', text: '长寿的意义，不只是活得更久，而是尽可能久地保持生活的能力。', theme: '健康寿命', origin: 'LONGEVIA 原创' },
  { id: 'q02', text: '衰老不是一个数字，而是一系列逐渐变化的生物过程。', theme: '衰老科学', origin: 'LONGEVIA 原创' },
  { id: 'q03', text: '最值得投资的抗衰项目，是今天就能开始的健康习惯。', theme: '健康习惯', origin: 'LONGEVIA 原创' },
  { id: 'q04', text: '不要只计算自己活了多少年，也要关注自己有多少年活得健康。', theme: '健康寿命', origin: 'LONGEVIA 原创' },
  { id: 'q05', text: '科学不是寻找永生的捷径，而是识别真正有效的长期选择。', theme: '科学方法', origin: 'LONGEVIA 原创' },
  { id: 'q06', text: '长寿不是单纯延长生命的长度，而是尽可能延长生命中健康的部分。', theme: '健康寿命', origin: 'LONGEVIA 原创' },
  { id: 'q07', text: '最好的抗衰，不是和时间较劲，而是让身体拥有更好的适应能力。', theme: '身体机能', origin: 'LONGEVIA 原创' },
  { id: 'q08', text: '不要只关注生物年龄的数字，更要关注肌肉、心肺、睡眠和生活能力。', theme: '评估边界', origin: 'LONGEVIA 原创' },
  { id: 'q09', text: '真正值得坚持的健康习惯，应该能够融入真实生活。', theme: '健康习惯', origin: 'LONGEVIA 原创' },
  { id: 'q10', text: '科学抗衰不是寻找神奇成分，而是理解复杂身体并做出长期正确的选择。', theme: '科学方法', origin: 'LONGEVIA 原创' },
  { id: 'q11', text: '今天的健康习惯，是未来身体机能的重要投资。', theme: '长期主义', origin: 'LONGEVIA 原创' },
  { id: 'q12', text: '不要把实验室里的希望，当成已经兑现的人体疗效。', theme: '证据边界', origin: 'LONGEVIA 原创' },
  { id: 'q13', text: '肌肉是可以长期储备的功能，而不只是外形。', theme: '身体机能', origin: 'LONGEVIA 原创' },
  { id: 'q14', text: '规律比完美更重要：能被重复的健康行为，才可能产生长期价值。', theme: '健康习惯', origin: 'LONGEVIA 原创' },
  { id: 'q15', text: '一个指标描述不了一个人，一次检测也定义不了一段人生。', theme: '评估边界', origin: 'LONGEVIA 原创' },
  { id: 'q16', text: '理解证据的强弱，比记住结论更接近科学。', theme: '科学方法', origin: 'LONGEVIA 原创' },
  { id: 'q17', text: '健康老龄化不是没有变化，而是在变化中尽量保住想做的事。', theme: '健康老龄化', origin: 'LONGEVIA 原创' },
  { id: 'q18', text: '睡眠、运动与饮食不是三个孤立项目，而是同一套身体系统的三个入口。', theme: '整体观', origin: 'LONGEVIA 原创' },
  { id: 'q19', text: '当一项干预承诺得太多，通常值得先看看证据有多少。', theme: '证据边界', origin: 'LONGEVIA 原创' },
  { id: 'q20', text: '延长健康寿命，是一场以十年为单位的普通生活。', theme: '长期主义', origin: 'LONGEVIA 原创' },
];

export function quoteOfTheDay(date = new Date()): Quote {
  const day = Math.floor(date.getTime() / 86400000);
  return quotes[day % quotes.length];
}
