import { applications, applicationCategories } from './applications.js'

export const stats = {
  apps: applications.length,
  categories: applicationCategories.length,
}

export const categories = [
  { id: 'sequence', icon: 'sequence', zh: '序列分析', en: 'Sequence', descZh: '从序列清理到比对与 motif，保留每一步的清晰路径。', descEn: 'From sequence cleanup to alignment and motifs, with a clear path at every step.', tools: 'MSA · GC · Motif' },
  { id: 'statistics', icon: 'chart-column', zh: '统计分析', en: 'Statistics', descZh: '差异、相关、聚类与统计检验，在同一张工作台上完成。', descEn: 'Differential analysis, correlation, clustering and statistical tests in one workspace.', tools: 'PCA · Correlation · Tests' },
  { id: 'algorithm', icon: 'brain-circuit', zh: '算法应用', en: 'Algorithm', descZh: '用成熟算法发现表达模式、网络关系与潜在结构。', descEn: 'Discover expression patterns, network relationships and latent structures.', tools: 'WGCNA · Clustering · ML' },
  { id: 'genomics', icon: 'dna', zh: '基因组学', en: 'Genomics', descZh: '浏览基因组结构、变异分布与共线性关系。', descEn: 'Explore genome architecture, variant distributions and synteny.', tools: 'Synteny · Variants · Maps' },
  { id: 'transcriptomics', icon: 'rna', zh: '转录组学', en: 'Transcriptomics', descZh: '从表达矩阵走向差异基因、趋势与调控线索。', descEn: 'Move from expression matrices to differential genes, trends and regulatory clues.', tools: 'Volcano · Heatmap · Trends' },
  { id: 'enrichment', icon: 'enrichment', zh: '功能富集', en: 'Enrichment', descZh: '将基因列表转化为可阅读的 GO、KEGG 与通路网络。', descEn: 'Turn gene lists into readable GO, KEGG and pathway networks.', tools: 'GO · KEGG · Pathways' },
  { id: 'proteomics', icon: 'protein', zh: '蛋白质组学', en: 'Proteomics', descZh: '围绕蛋白表达、注释和相互作用组织分析结果。', descEn: 'Organize protein expression, annotation and interaction results.', tools: 'Expression · Annotation · PPI' },
  { id: 'metabolomics', icon: 'metabolite', zh: '代谢组学', en: 'Metabolomics', descZh: '检查质谱峰、保留时间与代谢特征的统计模式。', descEn: 'Inspect mass spectral peaks, retention time and metabolic patterns.', tools: 'LC–MS · PLS · Peaks' },
  { id: 'clinical', icon: 'clinical', zh: '临床研究', en: 'Clinical', descZh: '把分子特征与生存、ROC 和临床表型连接起来。', descEn: 'Connect molecular features with survival, ROC and clinical phenotypes.', tools: 'Survival · ROC · Phenotypes' },
  { id: 'microorganisms', icon: 'microorganism', zh: '微生物组', en: 'Microorganisms', descZh: '探索群落结构、多样性与宏基因组特征。', descEn: 'Explore community structure, diversity and metagenomic features.', tools: '16S · Diversity · Metagenomics' },
  { id: 'singlecell', icon: 'cell', zh: '单细胞与空间', en: 'Single-cell', descZh: '从细胞聚类、轨迹到空间表达，观察组织中的细胞状态。', descEn: 'From cell clusters and trajectories to spatial expression and tissue states.', tools: 'UMAP · Trajectory · Spatial' },
  { id: 'mathematics', icon: 'sparkles', zh: '数学与拟合', en: 'Mathematics', descZh: '通过曲线拟合和数学模型描述实验关系。', descEn: 'Describe experimental relationships with curve fitting and mathematical models.', tools: 'Fitting · Models · Curves' },
  { id: 'table', icon: 'spreadsheet', zh: '表格操作', en: 'Table Operation', descZh: '整理、重塑、合并和计算数据，为下一步分析做好准备。', descEn: 'Clean, reshape, merge and compute data for the next analysis.', tools: 'Reshape · Merge · Compute' },
]

export const galleryItems = [
  { image: 'ToolCellUMAP.png', category: 'singlecell', zh: '单细胞 UMAP 聚类', en: 'Single-cell UMAP clusters', descZh: '在低维空间中识别细胞群及其相对关系。', descEn: 'Identify cell populations and their relationships in a low-dimensional space.' },
  { image: 'ToolSpatialFeature.png', category: 'singlecell', zh: '空间转录组特征', en: 'Spatial transcriptomic features', descZh: '将分子计数和组织空间位置放在同一视图中。', descEn: 'View molecular counts together with their spatial tissue context.' },
  { image: 'ToolVolcanoPlot.png', category: 'transcriptomics', zh: '差异表达火山图', en: 'Differential expression volcano plot', descZh: '同时评估变化幅度与统计显著性，定位关键基因。', descEn: 'Assess fold change and statistical significance to locate key genes.' },
  { image: 'ToolMitoGenome.png', category: 'genomics', zh: '细胞器基因组图谱', en: 'Organellar genome atlas', descZh: '环形呈现基因位置、类型和 GC 分布。', descEn: 'Map gene position, type and GC distribution in a circular genome.' },
  { image: 'ToolKEGGenrichBubble.png', category: 'enrichment', zh: 'KEGG 富集气泡图', en: 'KEGG enrichment bubbles', descZh: '用基因比例、数量和校正显著性比较通路。', descEn: 'Compare pathways by gene ratio, count and adjusted significance.' },
  { image: 'ToolMetaboMzHeatmap.png', category: 'metabolomics', zh: '代谢质谱特征热图', en: 'Metabolic MS feature heatmap', descZh: '沿保留时间观察质荷比特征的信号强度。', descEn: 'Inspect signal intensity of m/z features across retention time.' },
  { image: 'ToolMonocleTrajectories.png', category: 'singlecell', zh: '细胞分化轨迹', en: 'Cell differentiation trajectories', descZh: '重建细胞状态之间可能的分化路径。', descEn: 'Reconstruct potential differentiation paths between cell states.' },
  { image: 'ToolMafSummary.png', category: 'genomics', zh: '变异数据概览', en: 'Variant data summary', descZh: '总览变异分类、类型和样本分布。', descEn: 'Summarize variant classes, types and sample distributions.' },
  { image: 'ToolSurvivalAnalysis.png', category: 'clinical', zh: '生存分析', en: 'Survival analysis', descZh: '比较不同分组的生存曲线与风险关系。', descEn: 'Compare survival curves and risk relationships between groups.' },
]
