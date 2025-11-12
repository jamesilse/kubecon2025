import { echo } from './tools/echo.js';
import {
  listServices,
  getServiceEndpoints,
  checkServiceHealth,
  listNamespaces
} from './tools/kubernetes.js';
import {
  runLoadTest,
  createLoadProfile,
  parseTestResults
} from './tools/fortio.js';

export const allTools = [
  echo,
  // Kubernetes service discovery tools
  listServices,
  getServiceEndpoints,
  checkServiceHealth,
  listNamespaces,
  // Fortio load testing tools
  runLoadTest,
  createLoadProfile,
  parseTestResults
];

export function getTools() {
  return allTools;
}
