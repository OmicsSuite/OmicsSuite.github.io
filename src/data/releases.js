// Historical release notes are transcribed from the desktop app VersionInfo.java.
export const releases = [
  {
    "version": "2.0.0",
    "date": null,
    "current": true,
    "highlights": [
      {
        "type": "Release",
        "text": "First simultaneous release for Windows, macOS, and Linux."
      },
      {
        "type": "Platform",
        "text": "181 analysis and visualization applications across 13 omics and utility categories."
      },
      {
        "type": "Workspace",
        "text": "A connected desktop workspace for multi-omics analysis and visualization."
      }
    ]
  },
  {
    "version": "1.4.0",
    "date": "2024-01-09",
    "highlights": [
      {
        "type": "Apps",
        "text": "Transcriptomics Category +6: GroupedHeatmap, ShinyTOmicsVis, ClusterDendro, GeneRank, ClusterTrends, and HeatmapTrends"
      },
      {
        "type": "Features",
        "text": "Update R-4.2.2 to R-4.3.2"
      },
      {
        "type": "Features",
        "text": "Building TOmicsVis into OmicsSuite"
      },
      {
        "type": "Fixes",
        "text": "Fixed that the demo examples of some applications could not be completed, and fixed the stability of the software"
      }
    ]
  },
  {
    "version": "1.3.9",
    "date": "2023-09-07",
    "highlights": [
      {
        "type": "Features",
        "text": "Added ShinySEM application to Algorithm category for building structural equation models and visualization"
      },
      {
        "type": "Fixes",
        "text": "Fix links in OmicsSuite to provide CDN support"
      }
    ]
  },
  {
    "version": "1.3.8",
    "date": "2023-08-02",
    "highlights": [
      {
        "type": "Features",
        "text": "BioSciTools has been renamed OmicsSuite, and the corresponding github repository, website, and download links have been updated synchronously"
      },
      {
        "type": "Fixes",
        "text": "Fix the issue of some apps failing to run"
      }
    ]
  },
  {
    "version": "1.3.6",
    "date": "2023-05-15",
    "highlights": [
      {
        "type": "Features",
        "text": "① redesigned Logo based on the original logo; ② New website: https://OmicsSuite.podia.com; ③ promotional video: OmicsSuite Video"
      },
      {
        "type": "Fixes",
        "text": "① Update some application codes and parameters, such as CorPlot, PCAPlot, TSNEPlot, etc. ② Fix the running problems of some applications caused by the database"
      }
    ]
  },
  {
    "version": "1.3.5",
    "date": "2023-03-20",
    "highlights": [
      {
        "type": "Features",
        "text": "① Reduce the color, tone and transparency of all UI interfaces of the program; (2) optimize the description of parameters, especially the input file type and upload mode, such as the sequence input is mainly in Fasta format, which supports pasting sequence and uploading sequence files, the table data is mainly in Txt text tab format, which supports button upload and drag, and the single-cell Cellrange/Visium large data file mainly uses the specified file path. ③ Add references to all programs (published articles or R citation)"
      },
      {
        "type": "Apps",
        "text": "Introduce the 30+Shiny framework program I developed and optimized before through Java encryption code"
      },
      {
        "type": "Fixes",
        "text": "Solve the adaptation problem of some users due to the screen resolution of notebook or desktop computer"
      }
    ]
  },
  {
    "version": "1.3.4",
    "date": "2023-03-04",
    "highlights": [
      {
        "type": "Design",
        "text": "Add the OpenExample button at the bottom of the table window for all programs, which is convenient for users to find the program sample data and prepare the data structure suitable for the program according to the sample data"
      },
      {
        "type": "Apps",
        "text": "There are three new procedures for genome gene density and two/three genome collinearity analysis in Genomics genome classification, including genome density, digenomesynty and trigenomesynty"
      },
      {
        "type": "Apps",
        "text": "Six programs related to differentially expressed genes and KEGG Pathway visualization (`mversusa (maplot), upset, PathwayNativeSinglesmaple, PathwayNativeMultisample, PathwayGraphvizsingle, PathwayGraphvizmulti') in the Transcriptomics classification"
      },
      {
        "type": "Apps",
        "text": "Eight Metabolomics programs based on the original analysis of LC-MS mass spectrometry data mzML have been added to the metabolomics metabolomics classification, including metabomZML, metabomHeatmap, metaboroi, metabobasepeakion, metabotaliochrom, metabopeakintensity, metabopeakrt and metabopeakanno"
      },
      {
        "type": "Fixes",
        "text": "Solve the analysis process interruption and task failure caused by Chinese user names of some users. This update will be suitable for most Windows computer environments"
      }
    ]
  },
  {
    "version": "1.3.3",
    "date": "2023-02-26",
    "highlights": [
      {
        "type": "Design",
        "text": "This update beautifies the startup interface and the \"OmicsSuite\" on the Home page, classifies and counts Echarts"
      },
      {
        "type": "Apps",
        "text": "SingleCell classification of' Singlecell' is related to single cell differentiation trajectory ('monocle umap, monocle marker, monocle trajectories') and single cell spatial transcriptome ('spatial feature, spatial gene, spatial umap, spatialtsne, SpatialAirClusterMaker, SpatialAllClusterMaker, Spatial Slice`) a total of 10 programs"
      },
      {
        "type": "Apps",
        "text": "Six programs related to differentially expressed genes and KEGG Pathway visualization (`mversusa (maplot), upset, PathwayNativeSinglesmaple, PathwayNativeMultisample, PathwayGraphvizsingle, PathwayGraphvizmulti') in the Transcriptomics classification"
      },
      {
        "type": "Apps",
        "text": "Seven programs related to the operation of `sequences` nucleotide sequence or amino acid sequence (`seqslength, seqsheartail, seqsslice, seqsgc, seqstranslate, seqpalindrome, pairwise alignment')"
      },
      {
        "type": "Fixes",
        "text": "Fix the problem of slow loading of CDN when accessing the right sidebar page"
      }
    ]
  },
  {
    "version": "1.3.2",
    "date": "2023-02-19",
    "highlights": [
      {
        "type": "Design",
        "text": "Fixed slow loading of animation in startup interface"
      },
      {
        "type": "Apps",
        "text": "Update the data analysis program of single cell conventional transcriptome (SingleCell RNA-Seq) based on the output of 10X Genomics sequencing CellRange. Many programs mainly refer to 10X Genomics data format and Seurat data analysis flow, allowing users to perform data QC, cell filtering, mitochondrial gene proportion statistics, Feature filtering, hypervariable Feature identification, PCA analysis and JackStraw's selection of PCA, cell UMAP/TSNE clustering, Marker gene selection of all Cluster, and output visual results and corresponding tabular data in all analyses. The update procedures are as follows: update Heatmap and CircosHeatmap in Algorithm classification, update feature QC, feature filter, feature variable, feature PCA, PCA Jack Straw, Cell Umap, Celtsne in SingleCell classification, MarkerViolin, MarkerUMAP, MarkerHeatmap, CellAnnotation数据分析程序。多个程序主要参考10X Genomics数据格式和Seurat数据分析流程，允许用户执行数据QC、细胞过滤、线粒体基因占比统计、Feature过滤、高变Feature鉴定、PCA分析及JackStraw对PCA的选择、细胞UMAP/TSNE聚类、所有Cluster的Marker基因选择，所有分析中输出可视化结果和对应的表格数据。更新程序如下：Algorithm分类中更新Heatmap、CircosHeatmap，SingleCell分类中更新FeatureQC, FeatureFilter, FeatureVariable, FeaturePCA, PCAJackStraw, CellUMAP, CellTSNE, MarkerViolin, MarkerUMAP, MarkerHeatmap, CellAnnotation)"
      },
      {
        "type": "Fixes",
        "text": "Fixed slow loading of animation in startup interface"
      }
    ]
  },
  {
    "version": "1.3.1",
    "date": "2023-01-07",
    "highlights": [
      {
        "type": "Design",
        "text": "Optimize and update tool drawer category columns and icons"
      },
      {
        "type": "Apps",
        "text": "Add nearly 30 omics-related programs such as HG 19 Gene EXP, HG 19 Gene Marker, Chloroplast Genome, Mito Genome, Maftitv, Mafachange, Mafomatic Interaction, etc"
      },
      {
        "type": "Fixes",
        "text": "Fix the flashing of the main page to make the program load more smoothly"
      }
    ]
  },
  {
    "version": "1.3.0",
    "date": "2022-12-07",
    "highlights": [
      {
        "type": "Design",
        "text": "The main purpose of updating the interface of OmicsSuiteUI is to make the program simpler, more comfortable and more modern. I also examined my own aesthetic standards through continuous exploration, and finally found that a good interface needs clear logic, simple and comfortable interface"
      },
      {
        "type": "Apps",
        "text": "The newly added Apps mainly include barstat, scatterplot, groupline, quantile q (QQ), density normal, boxstat, violinstat, piestat, dounstat, and Seq Motif in Sequence category, DensityNormal, BoxStat, ViolinStat, PieStat, DountStat，以及Sequence分类中的Seq Motif程序)"
      },
      {
        "type": "Fixes",
        "text": "Temporarily shut down the use of Shiny Apps program, and the code logic and security problems are still being solved"
      }
    ]
  },
  {
    "version": "1.2.5",
    "date": "2022-10-30",
    "highlights": [
      {
        "type": "Features",
        "text": "New courses and feedback section"
      },
      {
        "type": "Features",
        "text": "New Shiny programs, such as Network Shiny, WGCNA Shiny and Community Shiny"
      },
      {
        "type": "Features",
        "text": "Re-adjust the layout and beautification of the program interface"
      }
    ]
  },
  {
    "version": "1.2.4",
    "date": "2022-10-30",
    "highlights": [
      {
        "type": "Fixes",
        "text": "This update is an emergency update, which mainly solves the fatal problem that many researchers can't start after installing OmicsSuite recently. ① This problem is not caused by Java and R environment. The program comes with a compressed version of JDK-11 environment, so users don't need to install any version of Java themselves. ② This problem is mainly due to the regional shielding of specific domain names in https://api.github.com. Therefore, this update mainly solves the problem that the API in the function is automatically requested to be updated when the program is started, and the program can be started and run under any circumstances of networking or disconnection after the update"
      }
    ]
  },
  {
    "version": "1.2.3",
    "date": "2022-09-30",
    "highlights": [
      {
        "type": "Features",
        "text": "The color of the beautified menu bar after expansion is light blue with a little bit of technological style, and the transparency with shadows is set to be similar to the ground glass effect. The drop position of the menu bar is designed to be 5px, and all submenu bars are designed to be rounded rectangles"
      },
      {
        "type": "Features",
        "text": "The native Choicebox selection box is designed as a rounded rectangle, and the drop-down selection box is designed as transparent light blue"
      },
      {
        "type": "Features",
        "text": "Each category of the toolbox is added with a corresponding color icon, and the number of programs label is added"
      },
      {
        "type": "Features",
        "text": "Light blue glow is added to all tool cards on the home page to show the scientific trend and add a light red background to the labels of tool cards"
      }
    ]
  },
  {
    "version": "1.2.2",
    "date": "2022-09-28",
    "highlights": [
      {
        "type": "Apps",
        "text": "Ribosome 16S DNA Mindmap"
      },
      {
        "type": "Apps",
        "text": "Metagenome Illumina Mindmap"
      },
      {
        "type": "Apps",
        "text": "Metagenome PacBio Mindmap"
      },
      {
        "type": "Apps",
        "text": "Glycometabolism Mindmap"
      }
    ]
  },
  {
    "version": "1.2.1",
    "date": "2022-09-27",
    "highlights": [
      {
        "type": "Features",
        "text": "Complete the window and content of Help -> HelpDoc"
      },
      {
        "type": "Features",
        "text": "Complete the window and content of Help -> About"
      },
      {
        "type": "Features",
        "text": "Complete the window and content of Help -> Source"
      },
      {
        "type": "Features",
        "text": "Complete the window and content of Help -> Version"
      },
      {
        "type": "Features",
        "text": "Complete the window and content of Help -> Update"
      }
    ]
  },
  {
    "version": "1.2.0",
    "date": "2022-09-25",
    "highlights": [
      {
        "type": "Features",
        "text": "This update of OmicsSuite adds automatic detection of new stable versions when starting programs. The official address for releasing new versions is: https://github.com/OmicsSuite/OmicsSuite.github.io/releases At the same time, this update is version 1.2.0, which means that important functions are new and new"
      }
    ]
  },
  {
    "version": "1.1.3",
    "date": "2022-06-25",
    "highlights": [
      {
        "type": "Apps",
        "text": "ChordPlot"
      }
    ]
  },
  {
    "version": "1.1.2",
    "date": "2022-06-09",
    "highlights": [
      {
        "type": "Apps",
        "text": "SurvivalAnalysis"
      },
      {
        "type": "Fixes",
        "text": "WGCNA Results Download"
      }
    ]
  },
  {
    "version": "1.1.1",
    "date": "2022-06-07",
    "highlights": [
      {
        "type": "Apps",
        "text": "WGCNA"
      }
    ]
  },
  {
    "version": "1.1.0",
    "date": "2022-05-31",
    "highlights": [
      {
        "type": "Apps",
        "text": "ClusterPlot"
      },
      {
        "type": "Apps",
        "text": "ClusterTree"
      },
      {
        "type": "Fixes",
        "text": "Fixed home page categories list"
      }
    ]
  },
  {
    "version": "1.0.9",
    "date": "2022-05-10",
    "highlights": [
      {
        "type": "Features",
        "text": "OmicsSuite provides an analysis result Table Download interface for all algorithms on which data analysis programs are based, such as PCA, TSNE, GO enrichment, KEGG enrichment, etc. Users can download data analysis result files by running the result [Table Download] button"
      },
      {
        "type": "Fixes",
        "text": "Fix the sample data of GO and KEGG format error"
      }
    ]
  },
  {
    "version": "1.0.8",
    "date": "2022-05-10",
    "highlights": [
      {
        "type": "Features",
        "text": "Browser buttons and table boxes of all programs support dragging and uploading data files"
      },
      {
        "type": "Features",
        "text": "All programs add a progress bar display to show the progress of background tasks"
      }
    ]
  },
  {
    "version": "1.0.7",
    "date": "2022-05-09",
    "highlights": [
      {
        "type": "Apps",
        "text": "GOenrichStat, GOenrichBar, GOenrichBubble, GOenrichNet, GOenrichTree, GOenrichMap"
      },
      {
        "type": "Apps",
        "text": "KEGGenrichBar, KEGGenrichBubble, KEGGenrichNet, KEGGenrichTree, KEGGenrichMap"
      }
    ]
  },
  {
    "version": "1.0.6",
    "date": "2022-05-06",
    "highlights": [
      {
        "type": "Fixes",
        "text": "Emergency repair"
      },
      {
        "type": "Fixes",
        "text": "Repair the operation logic of the Clear button of all apps, including resetting data and all parameters"
      },
      {
        "type": "Fixes",
        "text": "Clear the buffer data and results when closing App Tab button, and reset all variables and parameters"
      },
      {
        "type": "Fixes",
        "text": "Optimize the aesthetics of App Tab button"
      }
    ]
  },
  {
    "version": "1.0.5",
    "date": "2022-05-06",
    "highlights": [
      {
        "type": "Apps",
        "text": "SinCosTan"
      },
      {
        "type": "Apps",
        "text": "FourierFormula"
      },
      {
        "type": "Fixes",
        "text": "Fixed option of Clear button"
      }
    ]
  },
  {
    "version": "1.0.4",
    "date": "2022-05-03",
    "highlights": [
      {
        "type": "Apps",
        "text": "NetworkPlot (Regulatory Network Plot)"
      },
      {
        "type": "Apps",
        "text": "CommunityPlot (Regulatory Network Plot)"
      },
      {
        "type": "Features",
        "text": "The regulatory network plays a significant advantage in exploring the analysis of complex biological regulatory relationships. Based on the regulatory pairing data between two types of nodes (it is suggested that the regulatory relationship pairs meet the significance), this program constructs the regulatory relationship network by calculating the connectivity or simply counting the number of nodes, and visualizes it. Is suitable for that regulation relationship of protein-protein, gene-gene, microRNA-mrna, TF-gene, microRNA-circrna, microRNA-lncrna and other molecular pair"
      },
      {
        "type": "Fixes",
        "text": "Fixed options icon from dynamic to static"
      }
    ]
  },
  {
    "version": "1.0.3",
    "date": "2022-05-03",
    "highlights": [
      {
        "type": "Apps",
        "text": "TSNEPlot (TSNE analysis and Plot)"
      },
      {
        "type": "Apps",
        "text": "VolcanoPlot (Volcano and Plot)"
      },
      {
        "type": "Features",
        "text": "Add OmicsSuite clock and dynamic painting in the right drawer of the Home page"
      },
      {
        "type": "Features",
        "text": "At the bottom of the program, add an access window related to OmicsSuite, and you need to connect to the network"
      }
    ]
  },
  {
    "version": "1.0.2",
    "date": "2022-05-01",
    "highlights": [
      {
        "type": "Apps",
        "text": "Venn Plot (Venn Diagram Plot up to 7 sets)"
      },
      {
        "type": "Features",
        "text": "The right drawer of the Home page supports small screen access to Bioscience Tools official website and access to version update information"
      },
      {
        "type": "Features",
        "text": "The left drawer of the Home page crosses the mouse over the program button to support the preview function of the program interface"
      }
    ]
  },
  {
    "version": "1.0.1",
    "date": "2022-04-30",
    "highlights": [
      {
        "type": "Apps",
        "text": "PCAPlot (Principal Component Analysis and Plot)"
      },
      {
        "type": "Features",
        "text": "Add the Slider component for the first time"
      },
      {
        "type": "Features",
        "text": "Added official website information and version update section to the Home page for the first time"
      },
      {
        "type": "Features",
        "text": "Add the Clear button to reset the data"
      },
      {
        "type": "Fixes",
        "text": "Reduce the installer file"
      }
    ]
  },
  {
    "version": "1.0.0",
    "date": "2022-04-28",
    "highlights": [
      {
        "type": "Apps",
        "text": "RevCom (Reverse Complete)"
      },
      {
        "type": "Apps",
        "text": "CorPlot (Correlation Analysis and Plot)"
      },
      {
        "type": "Fixes",
        "text": "Package JRE 11 Java environment in OmicsSuite, so the Java 8 or later version don't need on user's computer"
      }
    ]
  },
  {
    "version": "1.0.0-Alpha",
    "date": "2022-04-26",
    "highlights": [
      {
        "type": "Apps",
        "text": "OmicsSuite project assumption -> JavaFX project was developed based on Java 11 -> OmicsSuite framework was preliminarily completed -> OmicsSuite (UI) user interface prototype design was completed"
      },
      {
        "type": "Fixes",
        "text": "Compile for the first time and support the installation of Windows platform"
      }
    ]
  }
]
