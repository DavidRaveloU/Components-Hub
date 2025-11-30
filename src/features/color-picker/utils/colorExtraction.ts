// Algoritmo de extracción (k-means clustering)

import type { ExtractedColor, RGBColor } from "../types/colorPicker.types";
import { rgbToHex, rgbToHsl, rgbToHtml } from "./colorConversion";

/**
 * Extrae los colores dominantes de una imagen usando k-means clustering
 */
export function extractDominantColors(
  pixels: Uint8ClampedArray,
  numColors: number = 6,
  maxIterations: number = 10
): ExtractedColor[] {
  // Convertir pixels a array de colores RGB
  const colors: RGBColor[] = [];
  for (let i = 0; i < pixels.length; i += 4) {
    colors.push({
      r: pixels[i],
      g: pixels[i + 1],
      b: pixels[i + 2],
    });
  }

  // Aplicar k-means clustering
  const centroids = kMeansClustering(colors, numColors, maxIterations);

  // Convertir centroids a ExtractedColor
  return centroids.map((rgb) => ({
    rgb,
    hex: rgbToHex(rgb),
    hsl: rgbToHsl(rgb),
    html: rgbToHtml(rgb),
  }));
}

/**
 * Algoritmo k-means clustering para agrupar colores
 */
function kMeansClustering(
  colors: RGBColor[],
  k: number,
  maxIterations: number
): RGBColor[] {
  // Inicializar centroids aleatoriamente
  let centroids = initializeCentroids(colors, k);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Asignar cada color al centroid más cercano
    const clusters: RGBColor[][] = Array.from({ length: k }, () => []);

    for (const color of colors) {
      const closestIndex = findClosestCentroid(color, centroids);
      clusters[closestIndex].push(color);
    }

    // Calcular nuevos centroids
    const newCentroids = clusters.map((cluster) => {
      if (cluster.length === 0) {
        // Si un cluster está vacío, mantener el centroid anterior
        return centroids[clusters.indexOf(cluster)];
      }
      return calculateMean(cluster);
    });

    // Verificar convergencia
    if (centroidsEqual(centroids, newCentroids)) {
      break;
    }

    centroids = newCentroids;
  }

  return centroids;
}

/**
 * Inicializa centroids usando k-means++
 */
function initializeCentroids(colors: RGBColor[], k: number): RGBColor[] {
  const centroids: RGBColor[] = [];

  // Primer centroid aleatorio
  centroids.push(colors[Math.floor(Math.random() * colors.length)]);

  // Seleccionar k-1 centroids restantes
  for (let i = 1; i < k; i++) {
    const distances = colors.map((color) => {
      const minDist = Math.min(
        ...centroids.map((centroid) => colorDistance(color, centroid))
      );
      return minDist * minDist;
    });

    const totalDistance = distances.reduce((sum, d) => sum + d, 0);
    let random = Math.random() * totalDistance;

    for (let j = 0; j < colors.length; j++) {
      random -= distances[j];
      if (random <= 0) {
        centroids.push(colors[j]);
        break;
      }
    }
  }

  return centroids;
}

/**
 * Encuentra el centroid más cercano a un color
 */
function findClosestCentroid(color: RGBColor, centroids: RGBColor[]): number {
  let minDistance = Infinity;
  let closestIndex = 0;

  centroids.forEach((centroid, index) => {
    const distance = colorDistance(color, centroid);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

/**
 * Calcula la distancia euclidiana entre dos colores
 */
function colorDistance(c1: RGBColor, c2: RGBColor): number {
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Calcula el color promedio de un cluster
 */
function calculateMean(colors: RGBColor[]): RGBColor {
  const sum = colors.reduce(
    (acc, color) => ({
      r: acc.r + color.r,
      g: acc.g + color.g,
      b: acc.b + color.b,
    }),
    { r: 0, g: 0, b: 0 }
  );

  return {
    r: Math.round(sum.r / colors.length),
    g: Math.round(sum.g / colors.length),
    b: Math.round(sum.b / colors.length),
  };
}

/**
 * Verifica si dos arrays de centroids son iguales
 */
function centroidsEqual(c1: RGBColor[], c2: RGBColor[]): boolean {
  return c1.every((centroid, index) => {
    const other = c2[index];
    return (
      centroid.r === other.r && centroid.g === other.g && centroid.b === other.b
    );
  });
}
