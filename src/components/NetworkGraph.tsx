import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MedicalRecord } from '../types';
import { useSettings } from '../context/SettingsContext';

interface NetworkGraphProps {
  data: MedicalRecord[];
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const { t, theme, accentColor } = useSettings();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const width = 800;
    const height = 600;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    // Build hierarchical data
    const root = { id: 'Root', group: 0, children: [] as any[] };
    
    // Group by SupplierID
    const suppliers = d3.group(data, (d: MedicalRecord) => d.SupplierID);
    
    Array.from(suppliers.entries()).forEach(([supplierId, supplierData]) => {
      const supplierNode = { id: `Supplier: ${supplierId}`, group: 1, children: [] as any[] };
      root.children.push(supplierNode);
      
      const categories = d3.group(supplierData, (d: MedicalRecord) => d.Category);
      Array.from(categories.entries()).forEach(([category, categoryData]) => {
        const categoryNode = { id: `Cat: ${category.substring(0, 10)}...`, fullId: category, group: 2, children: [] as any[] };
        supplierNode.children.push(categoryNode);
        
        const licenses = d3.group(categoryData, (d: MedicalRecord) => d.LicenseNo);
        Array.from(licenses.entries()).forEach(([license, licenseData]) => {
          const licenseNode = { id: `Lic: ${license}`, group: 3, children: [] as any[] };
          categoryNode.children.push(licenseNode);
          
          const models = d3.group(licenseData, (d: MedicalRecord) => d.Model);
          Array.from(models.entries()).forEach(([model, modelData]) => {
            const modelNode = { id: `Mod: ${model}`, group: 4, children: [] as any[] };
            licenseNode.children.push(modelNode);
            
            const customers = d3.group(modelData, (d: MedicalRecord) => d.CustomerID);
            Array.from(customers.entries()).forEach(([customer, customerData]) => {
              modelNode.children.push({ id: `Cust: ${customer}`, group: 5, value: customerData.length });
            });
          });
        });
      });
    });

    const hierarchy = d3.hierarchy(root);
    const nodes = hierarchy.descendants();
    const links = hierarchy.links();

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(50))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(20));

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    // Add zoom
    const g = svg.append('g');
    svg.call(d3.zoom().on('zoom', (e) => {
      g.attr('transform', e.transform);
    }) as any);

    const isDark = theme === 'dark';
    const linkColor = isDark ? '#52525b' : '#d4d4d8';
    const strokeColor = isDark ? '#18181b' : '#ffffff';

    const link = g.append('g')
      .attr('stroke', linkColor)
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line');

    const colorScale = d3.scaleOrdinal([accentColor, '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']);

    const node = g.append('g')
      .attr('stroke', strokeColor)
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => (d as any).group === 0 ? 10 : 6)
      .attr('fill', d => colorScale((d as any).data.group))
      .call(drag(simulation) as any)
      .on('click', (event, d) => {
        setSelectedNode((d as any).data);
      });

    node.append('title')
      .text(d => (d as any).data.id);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [data, theme, accentColor]);

  return (
    <div className="relative w-full h-[600px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
      <svg ref={svgRef} className="w-full h-full" />
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg text-sm text-zinc-700 dark:text-zinc-200 max-w-xs">
          <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{t('nodeDetails')}</h4>
          <p><span className="text-zinc-500 dark:text-zinc-400">{t('id')}:</span> {selectedNode.fullId || selectedNode.id}</p>
          <p><span className="text-zinc-500 dark:text-zinc-400">{t('level')}:</span> {selectedNode.group}</p>
          {selectedNode.value && <p><span className="text-zinc-500 dark:text-zinc-400">{t('count')}:</span> {selectedNode.value}</p>}
          <button 
            className="mt-3 text-xs text-white px-2 py-1 rounded transition-colors"
            style={{ backgroundColor: accentColor }}
            onClick={() => setSelectedNode(null)}
          >
            {t('close')}
          </button>
        </div>
      )}
    </div>
  );
};
