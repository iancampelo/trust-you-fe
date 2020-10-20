import { intersection } from 'lodash';
import { randomColor } from 'randomcolor';

export const prepareDataToChart = (chartName, reviews) => {
  let labels = [];
  let data = [];
  reviews.map(item => {
    labels.push(item[0]);
    data.push(item[1]);
  });
  const colors = mapColorsToLabels(labels);
  return {
    labels: labels,
    datasets: [{
      label: chartName,
      data: data,
      fill: true,
      backgroundColor: colors,
    }]
  }
};

export const getAnswerTitle = (answer) => {
  return answer.replace(/(?:_|^)([a-z]+)/g, (m, g1) => g1.toUpperCase() + " ");
}

let labelColors = {};
const mapColorsToLabels = labels => {
  const usedKeys = intersection(Object.keys(labelColors), labels);
  let firstAvailColor = usedKeys.length;
  const colors = randomColor({hue: 'blue', count: labels.length});

  let chartColors = [];
  let usedColors = {};

  usedKeys.forEach(label => {
    usedColors[labelColors[label]] = true;
  });

  labels.forEach(label => {
    if (!labelColors[label]) {
      while (usedColors[colors[firstAvailColor]]) {
        firstAvailColor += 1;
      }
      labelColors[label] = colors[firstAvailColor];
      firstAvailColor += 1;
    }
    chartColors.push(labelColors[label]);
  });
  return chartColors;
};

export const formatDate = (date) => {
  return new Date(date).toISOString();
}