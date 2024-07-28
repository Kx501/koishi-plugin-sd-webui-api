import { Schema, Logger } from 'koishi';
export const log = new Logger('sd-webui-api');

export interface Config {
  endpoint: string; // API端点
  save: boolean; // 是否保存到本地
  sampler: string; // 采样器选项
  scheduler: string; // 调度器选项
  imageSize: number[]; // 图片尺寸
  cfgScale: number; // CFG Scale
  txt2imgSteps: number; // 文生图步骤数
  img2imgSteps: number; // 图生图步骤数
  maxSteps: number; // 最大步骤数（指令允许的最大）
  prompt: string; // 正向提示词
  negativePrompt: string; // 负向提示词
  promptPrepend: boolean; // 正向提示词是否前置
  negativePromptPrepend: boolean; // 负向提示词是否前置
  restoreFaces: boolean; // 是否使用人脸修复
  hiresFix: boolean; // 是否使用高分辨率修复
  wd14tagger: string; // 图像反推模型
  outputMethod: string;  // 输出方式
  setConfig: boolean; // 指令修改SD全局设置
  useTranslation: boolean; // 是否使用翻译服务
  maxTasks: number; // 最大任务数
}

// 配置约束
export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    endpoint: Schema.string()
      .default('http://127.0.0.1:7860').description('SD-WebUI API的网络地址'),
    save: Schema.boolean()
      .default(false).description('是否保存图片到本地'),
    sampler: Schema.union([
      'DPM++ 2M',
      'DPM++ SDE',
      'DPM++ 2M SDE',
      'DPM++ 2M SDE Heun',
      'DPM++ 2S a',
      'DPM++ 3M SDE',
      'Euler a',
      'Euler',
      'LMS',
      'Heun',
      'DPM2',
      'DPM2 a',
      'DPM fast',
      'DPM adaptive',
      'Restart',
      'DDIM',
      'PLMS',
      'UniPC',
      'LCM'
    ])
      .default('DPM++ SDE').description('采样器选择'),
    scheduler: Schema.union([
      'Automatic',
      'Uniform',
      'Karras',
      'Exponential',
      'Polyexponential',
      'SGM Uniform'
    ])
      .default('Automatic').description('调度器选择'),
    imageSize: Schema.tuple([Schema.number(), Schema.number()])
      .default([512, 512]).description(`默认宽度和高度(16的倍数)
  - 模板：
  - 256x256
  - 512x512
  - 512x768
  - 832x1216
  - 1024x1024
  - 1280x720
  - 1920x1080
  `),
    cfgScale: Schema.number()
      .default(7).description('提示词引导系数，用于控制图像服从提示词程度'),
    txt2imgSteps: Schema.number()
      .default(20).description('文生图默认采样步数'),
    img2imgSteps: Schema.number()
      .default(40).description('图生图默认采样步数'),
    maxSteps: Schema.number()
      .default(60).description('最大允许采样步数'),
    prompt: Schema.string()
      .default('').description('默认正向提示词'),
    negativePrompt: Schema.string()
      .default('').description('默认负向提示词'),
    promptPrepend: Schema.boolean()
      .default(true).description('正向提示词是否添加在指令提示词之前'),
    negativePromptPrepend: Schema.boolean()
      .default(true).description('负向提示词是否添加在指令提示词之前'),
    restoreFaces: Schema.boolean()
      .default(false).description('是否启用人脸修复').disabled(),
    hiresFix: Schema.boolean()
      .default(false).description('是否启用高分辨率修复').disabled(),
  }).description('绘画设置'),
  Schema.object({
    wd14tagger: Schema.union([
      'wd-convnext-v3',
      'wd-swinv2-v3',
      'wd-vit-v3',
      'wd14-convnext',
      'wd14-convnext-v2',
      'wd14-convnext-v2-git',
      'wd14-convnextv2-v2',
      'wd14-convnextv2-v2-git',
      'wd14-moat-v2',
      'wd14-swinv2-v2',
      'wd14-swinv2-v2-git',
      'wd14-vit',
      'wd14-vit-v2',
      'wd14-vit-v2-git',
    ])
      .default('wd14-vit-v2-git').description('反推模型选择'),
  }).description('扩展设置'),
  Schema.object({
    outputMethod: Schema.union([
      '仅图片',
      '关键信息',
      '详细信息'
    ]).default('仅图片').description('输出方式'),
    setConfig: Schema.boolean()
      .default(false).description('是否启用指令修改SD全局设置'),
  }).description('其他设置'),
  Schema.object({
    useTranslation: Schema.boolean()
      .default(false).description('是否启用翻译服务以处理非英文提示词'),
    maxTasks: Schema.number()
      .default(3).description('最大任务数'),
  }).description('拓展功能'),
]);