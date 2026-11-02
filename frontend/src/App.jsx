import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DatasetOverview from './pages/DatasetOverview';
import EDA from './pages/EDA';
import DMLMethodology from './pages/DMLMethodology';
import CausalAnalysis from './pages/CausalAnalysis';
import DynamicPricing from './pages/DynamicPricing';
import Documentation from './pages/Documentation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dataset" element={<DatasetOverview />} />
          <Route path="eda" element={<EDA />} />
          <Route path="methodology" element={<DMLMethodology />} />
          <Route path="causal-analysis" element={<CausalAnalysis />} />
          <Route path="pricing" element={<DynamicPricing />} />
          <Route path="documentation" element={<Documentation />} />
          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
