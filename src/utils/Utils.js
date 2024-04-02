import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js');
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export const formatThousands = (value) =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export const formatPlayResultText = ({ playResult, hitter }) => {
  if (!playResult || !playResult.paOutcome) return '';
  let resultText = hitter ? `${hitter.first_name} ${hitter.last_name} ` : '';
  switch (playResult?.paOutcome?.name) {
    case 'strikeout':
      resultText += 'struck out';
      break;
    case 'walk':
      resultText += 'walked';
      break;
    case 'homerun':
      resultText += 'homered';
      break;
    case 'single':
      resultText += `singled on a ${formatHitResult(playResult.battedBallOutcome)}`;
      break;
    case 'double':
      resultText += `doubled on a ${formatHitResult(playResult.battedBallOutcome)}`;
      break;
    case 'triple':
      resultText += `tripled on a ${formatHitResult(playResult.battedBallOutcome)}`;
      break;
    case 'out':
      switch (playResult.battedBallOutcome.name) {
        case 'groundball':
          resultText += 'grounded out';
          break;
        case 'flyball':
          resultText += 'flied out';
          break;
        case 'lineDrive':
          resultText += 'lined out';
          break;
        default:
          resultText += 'made an out';
      }
      break;
    default:
      resultText += 'did something';
  }
  if (playResult.runnersScored?.length > 0) {
    resultText += `. ${
      playResult.runnersScored.map((runner) => `${runner.first_name} ${runner.last_name}`).join(', ') || ''
    } scored`;
  }
  return resultText;
};

export const formatHitResult = (battedBallOutcome) => {
  switch (battedBallOutcome.name) {
    case 'groundball':
      return 'groundball';
    case 'flyball':
      return 'fly ball';
    case 'lineDrive':
      return 'line drive';
    default:
      return 'hit';
  }
};

export const formatInningText = (inning, topOfInning) => {
  return `${topOfInning ? 'Top' : 'Bottom'} ${inning}`;
};
