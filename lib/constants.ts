/**
 * Application-wide constants and configuration
 */

// Language configuration
export const LANGUAGES = ['en', 'zh'] as const;
export type Language = typeof LANGUAGES[number];

// File upload configuration
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const MAX_DESCRIPTION_LENGTH = 500;

// University configuration
export const ALLOWED_UNIVERSITIES = ['xidian', 'xsyu', 'xaut', 'bristol'] as const;
export type University = typeof ALLOWED_UNIVERSITIES[number];

export const UNIVERSITY_NAMES: Record<Language, Record<University, string>> = {
  en: {
    xidian: 'Xidian University',
    xsyu: "Xi'an Shiyou University",
    xaut: "Xi'an University of Technology",
    bristol: 'University of Bristol',
  },
  zh: {
    xidian: '西安电子科技大学',
    xsyu: '西安石油大学',
    xaut: '西安理工大学',
    bristol: '布里斯托大学',
  },
};

export const UNIVERSITY_LOGOS: Record<University, string> = {
  xidian: '/xidian-logo.png',
  xsyu: '/xsyu-logo.png',
  xaut: '/xaut-logo.png',
  bristol: '/bristol-logo.webp',
};

export const UNIVERSITY_COLORS: Record<University, {
  gradient: string;
  bg: string;
  text: string;
  border: string;
  hoverBorder: string;
}> = {
  xidian: {
    gradient: 'from-purple-600 to-blue-600',
    bg: 'from-purple-50 to-blue-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
  },
  xsyu: {
    gradient: 'from-emerald-600 to-teal-600',
    bg: 'from-emerald-50 to-teal-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
  },
  xaut: {
    gradient: 'from-orange-600 to-red-600',
    bg: 'from-orange-50 to-red-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
  },
  bristol: {
    gradient: 'from-indigo-600 to-blue-600',
    bg: 'from-indigo-50 to-blue-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
  },
};

// Photo metadata configuration
export const PHOTO_TIME_OPTIONS = ['dawn', 'morning', 'noon', 'afternoon', 'dusk', 'night'] as const;
export type PhotoTime = typeof PHOTO_TIME_OPTIONS[number];

export const PHOTO_TIME_NAMES: Record<Language, Record<PhotoTime, string>> = {
  en: {
    dawn: 'Dawn',
    morning: 'Morning',
    noon: 'Noon',
    afternoon: 'Afternoon',
    dusk: 'Dusk',
    night: 'Night',
  },
  zh: {
    dawn: '黎明',
    morning: '上午',
    noon: '中午',
    afternoon: '下午',
    dusk: '黄昏',
    night: '夜晚',
  },
};

export const PHOTO_SEASON_OPTIONS = ['spring', 'summer', 'autumn', 'winter'] as const;
export type PhotoSeason = typeof PHOTO_SEASON_OPTIONS[number];

export const PHOTO_SEASON_NAMES: Record<Language, Record<PhotoSeason, string>> = {
  en: {
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter',
  },
  zh: {
    spring: '春季',
    summer: '夏季',
    autumn: '秋季',
    winter: '冬季',
  },
};

export const PHOTO_WEATHER_OPTIONS = ['sunny', 'cloudy', 'overcast', 'rainy', 'snowy'] as const;
export type PhotoWeather = typeof PHOTO_WEATHER_OPTIONS[number];

export const PHOTO_WEATHER_NAMES: Record<Language, Record<PhotoWeather, string>> = {
  en: {
    sunny: 'Sunny',
    cloudy: 'Cloudy',
    overcast: 'Overcast',
    rainy: 'Rainy',
    snowy: 'Snowy',
  },
  zh: {
    sunny: '晴天',
    cloudy: '多云',
    overcast: '阴天',
    rainy: '雨天',
    snowy: '雪天',
  },
};

export const PHOTO_LOCATION_OPTIONS = [
  'teaching_building',
  'library',
  'gymnasium',
  'playground',
  'canteen',
  'dormitory',
  'gate',
  'square',
  'laboratory',
  'other',
] as const;
export type PhotoLocation = typeof PHOTO_LOCATION_OPTIONS[number];

export const PHOTO_LOCATION_NAMES: Record<Language, Record<PhotoLocation, string>> = {
  en: {
    teaching_building: 'Teaching Building',
    library: 'Library',
    gymnasium: 'Gymnasium',
    playground: 'Playground',
    canteen: 'Canteen',
    dormitory: 'Dormitory',
    gate: 'Gate',
    square: 'Square',
    laboratory: 'Laboratory',
    other: 'Other',
  },
  zh: {
    teaching_building: '教学楼',
    library: '图书馆',
    gymnasium: '体育馆',
    playground: '操场',
    canteen: '食堂',
    dormitory: '宿舍',
    gate: '校门',
    square: '广场',
    laboratory: '实验室',
    other: '其他',
  },
};

export const PHOTO_STYLE_OPTIONS = ['landscape', 'architecture', 'night', 'aerial'] as const;
export type PhotoStyle = typeof PHOTO_STYLE_OPTIONS[number];

export const PHOTO_STYLE_NAMES: Record<Language, Record<PhotoStyle, string>> = {
  en: {
    landscape: 'Landscape',
    architecture: 'Architecture',
    night: 'Night View',
    aerial: 'Aerial',
  },
  zh: {
    landscape: '风景',
    architecture: '建筑',
    night: '夜景',
    aerial: '航拍',
  },
};

// Helper function to validate university
export const isValidUniversity = (param: string | null): param is University => {
  return param !== null && ALLOWED_UNIVERSITIES.includes(param as University);
};

// Page text translations
export const PAGE_TEXT: Record<Language, {
  // Header
  appName: string;
  guidelines: string;
  privacy: string;

  // Hero section
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;

  // University cards
  uploadPhotos: string;

  // Features
  featureNoLoginTitle: string;
  featureNoLoginDesc: string;
  featureMultiUploadTitle: string;
  featureMultiUploadDesc: string;
  featureMobileTitle: string;
  featureMobileDesc: string;
  featurePrivacyTitle: string;
  featurePrivacyDesc: string;

  // Call to action
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;

  // Footer
  footerGuidelines: string;
  footerPrivacy: string;
  footerCopyright: string;
}> = {
  en: {
    // Header
    appName: 'Campus Collector',
    guidelines: 'Guidelines',
    privacy: 'Privacy',

    // Hero section
    heroTitle: 'Share Your',
    heroHighlight: 'Campus',
    heroSubtitle: 'Help us create a comprehensive photo dataset that powers research and innovation.',

    // University cards
    uploadPhotos: 'Upload Photos',

    // Features
    featureNoLoginTitle: 'No Login Required',
    featureNoLoginDesc: 'Upload anonymously without creating an account',
    featureMultiUploadTitle: 'Multi-Upload',
    featureMultiUploadDesc: 'Select and upload multiple photos at once',
    featureMobileTitle: 'Mobile Friendly',
    featureMobileDesc: 'Fully responsive design for all devices',
    featurePrivacyTitle: 'Privacy First',
    featurePrivacyDesc: 'Your privacy is our top priority',

    // Call to action
    ctaTitle: 'Ready to Contribute?',
    ctaSubtitle: 'Join researchers and students in building a valuable dataset for academic innovation.',
    ctaButton: 'Read Guidelines',

    // Footer
    footerGuidelines: 'Photography Guidelines',
    footerPrivacy: 'Privacy Policy',
    footerCopyright: '2025 Campus Photo Collector',
  },
  zh: {
    // Header
    appName: '校园照片收集',
    guidelines: '使用指南',
    privacy: '隐私政策',

    // Hero section
    heroTitle: '分享你的',
    heroHighlight: '校园',
    heroSubtitle: '帮助我们创建一个全面的照片数据集，为科研和创新提供支持。',

    // University cards
    uploadPhotos: '上传照片',

    // Features
    featureNoLoginTitle: '无需登录',
    featureNoLoginDesc: '无需创建账户即可匿名上传',
    featureMultiUploadTitle: '批量上传',
    featureMultiUploadDesc: '一次选择并上传多张照片',
    featureMobileTitle: '移动端友好',
    featureMobileDesc: '适配所有设备的响应式设计',
    featurePrivacyTitle: '隐私优先',
    featurePrivacyDesc: '您的隐私是我们的首要任务',

    // Call to action
    ctaTitle: '准备好贡献了吗？',
    ctaSubtitle: '加入研究人员和学生，共同构建有价值的学术创新数据集。',
    ctaButton: '阅读指南',

    // Footer
    footerGuidelines: '拍摄指南',
    footerPrivacy: '隐私政策',
    footerCopyright: '2025 校园照片收集平台',
  },
};

// Upload page text translations
export const UPLOAD_PAGE_TEXT: Record<Language, {
  // Error page
  invalidUniversity: string;
  invalidUniversityDesc: string;
  goBackHome: string;

  // Header
  uploadPhotos: string;
  backToHome: string;

  // Success/Error messages
  successTitle: string;
  successMessage: string;
  uploadFailedTitle: string;

  // File upload area
  clickToUpload: string;
  orDragAndDrop: string;
  fileTypes: string;
  selectMultiple: string;

  // Selected photos
  selectedPhoto: string;
  selectedPhotos: string;
  gps: string;
  noGPS: string;
  focalLength: string;
  noFocalLength: string;
  descriptionOptional: string;
  descriptionPlaceholder: string;

  // Metadata labels
  photoTime: string;
  photoSeason: string;
  photoWeather: string;
  photoLocation: string;
  photoStyle: string;

  // AI Analysis
  aiSmartFill: string;
  analyzing: string;
  aiConfidence: string;
  aiReasoning: string;
  reanalyze: string;

  // Submit
  submitButton: string;
  uploading: string;
  uploadingProgress: string;
}> = {
  en: {
    // Error page
    invalidUniversity: 'Invalid University',
    invalidUniversityDesc: 'The selected university was not found.',
    goBackHome: 'Go back to home',

    // Header
    uploadPhotos: 'Upload Photos',
    backToHome: 'Back to Home',

    // Success/Error messages
    successTitle: 'Success!',
    successMessage: 'Your photos have been uploaded successfully. You can continue uploading more photos.',
    uploadFailedTitle: 'Upload Failed',

    // File upload area
    clickToUpload: 'Click to upload',
    orDragAndDrop: 'or drag and drop',
    fileTypes: 'PNG, JPG, JPEG (MAX. 10MB each)',
    selectMultiple: 'Select multiple files at once',

    // Selected photos
    selectedPhoto: 'Selected Photo',
    selectedPhotos: 'Selected Photos',
    gps: 'GPS',
    noGPS: 'No GPS',
    focalLength: 'Focal Length',
    noFocalLength: 'No focal length',
    descriptionOptional: 'Description (optional)',
    descriptionPlaceholder: 'e.g., Main library entrance during autumn...',

    // Metadata labels
    photoTime: 'Photo Time',
    photoSeason: 'Photo Season',
    photoWeather: 'Photo Weather',
    photoLocation: 'Photo Location',
    photoStyle: 'Photo Style',

    // AI Analysis
    aiSmartFill: 'AI Smart Fill',
    aiSmartFillHint: 'Click to let AI analyze the image and fill metadata (or select manually)',
    analyzing: 'Analyzing...',
    analyzingTitle: 'AI is analyzing the image...',
    analyzingDesc: 'Automatically identifying time, season, weather, location, and style',
    aiConfidence: 'Confidence',
    aiReasoning: 'Reasoning',
    aiAutoFilled: 'AI has automatically filled metadata',
    aiAnalysis: 'AI Analysis',
    aiAutoSelected: 'AI has automatically selected the following options, you can modify them below:',
    aiTimeLabel: 'Time:',
    aiSeasonLabel: 'Season:',
    aiWeatherLabel: 'Weather:',
    aiLocationLabel: 'Location:',
    aiStyleLabel: 'Style:',
    reanalyze: 'Re-analyze',

    // Submit
    submitButton: 'Upload Photos',
    uploading: 'Uploading...',
    uploadingProgress: 'Uploading your photos',
  },
  zh: {
    // Error page
    invalidUniversity: '无效的大学',
    invalidUniversityDesc: '所选大学未找到。',
    goBackHome: '返回首页',

    // Header
    uploadPhotos: '上传照片',
    backToHome: '返回首页',

    // Success/Error messages
    successTitle: '成功！',
    successMessage: '您的照片已成功上传。您可以继续上传更多照片。',
    uploadFailedTitle: '上传失败',

    // File upload area
    clickToUpload: '点击上传',
    orDragAndDrop: '或拖放文件',
    fileTypes: 'PNG, JPG, JPEG (每个文件最大 10MB)',
    selectMultiple: '一次选择多个文件',

    // Selected photos
    selectedPhoto: '已选照片',
    selectedPhotos: '已选照片',
    gps: '定位',
    noGPS: '无定位信息',
    focalLength: '焦距',
    noFocalLength: '无焦距信息',
    descriptionOptional: '描述（可选）',
    descriptionPlaceholder: '例如：秋季图书馆主入口...',

    // Metadata labels
    photoTime: '拍摄时间',
    photoSeason: '拍摄季节',
    photoWeather: '天气情况',
    photoLocation: '拍摄地点',
    photoStyle: '照片风格',

    // AI Analysis
    aiSmartFill: 'AI 智能填充',
    aiSmartFillHint: '点击让 AI 自动分析图片并填充元数据（或手动选择）',
    analyzing: '分析中...',
    analyzingTitle: 'AI 正在分析图片...',
    analyzingDesc: '自动识别时间、季节、天气、地点和风格',
    aiConfidence: '置信度',
    aiReasoning: '分析理由',
    aiAutoFilled: 'AI 已自动填充元数据',
    aiAnalysis: 'AI 分析',
    aiAutoSelected: 'AI 已自动选择以下选项，你可以在下方修改：',
    aiTimeLabel: '时间：',
    aiSeasonLabel: '季节：',
    aiWeatherLabel: '天气：',
    aiLocationLabel: '地点：',
    aiStyleLabel: '风格：',
    reanalyze: '重新分析',

    // Submit
    submitButton: '上传照片',
    uploading: '上传中...',
    uploadingProgress: '正在上传您的照片',
  },
};
