---
layout: post
title: "Using clip-path to mock stroke-alignment in SVGs"
tagline: How to control how a shape's stroke is drawn using clip-path. This post will have examples using D3.js. 
tags: [svg, d3.js, visualizations, stroke, stroke-alignment]
comments: false
---



{% highlight R %}
# 27K is selected by default
methyl <- getTCGA(disease="LUAD", data.type="Methylation")

# 450K example—450K isn't available for every dataset. Check in TCGA before downloading 
# methyl <- getTCGA(disease="LUAD", data.type="Methylation", type="450K")

# Table of samples vs. CpG site beta-values is found in $dat 
data = methyl$dat

# Script to see distribution of primary/metastatic/normal tissue. 

samples <- colnames(data)
parsed <- strsplit(samples,"-")
parsed <- lapply(parsed, `[[`, 4)
parsed <- unlist(parsed, recursive=FALSE)
print(table(parsed))

# Replace sample names, transform, and add label.  
colnames(data) <- gsub(pattern='-', replacement='_', x=colnames(data))
t_data <- t(data)
t_data = as.data.frame(t_data)
t_data$type = c(rep(CODE,nrow(t_data)))

# Add row names to make sure table prints out correctly in .txt format 
t_data <- cbind(Row.names = rownames(t_data), t_data)

write.table(t_data,file=paste0("LUAD-methyl-labeled",".txt"), append = FALSE, sep = "\t", row.names = FALSE, col.names = TRUE)

{% endhighlight %}

The `$dat` attribute of the returned data structure gives us a matrix, where, again, the rows represent a CpG site and columns represent a sample. I transform the matrix, add a label for the origin site/disease type (i.e., LUAD), and store as a .txt file. This is repeated for each origin site I wanted to look at, and then all the .txt files are merged, resulting in a matrix with their labeled origin sites. 

### 2.2: Feature selection in R

Since DNA methylation yields a much larger dataset, I did some feature selection before transforming the data matrix. I removed all features (CpG sites) with more than 30% "NA" values. If you want to go even further with the feature selection at this stage, you can consider filtering the matrix based on differential expression using [variance cut-offs](https://stackoverflow.com/questions/17003928/r-filter-matrix-based-on-variance-cut-offs) or [limma](https://bioconductor.org/packages/release/bioc/html/limma.html). You can filter for differential expression between different origin sites, between tumor vs. normal tissue samples, etc. 


## 3: Conclusion 

Now, we have two datasets ready to be analyzed in Python. Examples of how to build machine learning models based on the processed data are available on [GitHub](https://github.com/programmingprincess/tumor-origin).

The main effort was processing TCGA data, a step that I could only find very scattered documentation for. Hope this post helps other beginners trying to work with microRNA and DNA methylation data! :) 


Here's a list of resources I referenced for data processing:
- Biostar: [miRNAseq isoform quantification](https://www.biostars.org/p/101182/)
- R packages: [TCGA2STAT](http://www.liuzlab.org/TCGA2STAT/), [Bioconductor limma](https://bioconductor.org/packages/release/bioc/html/limma.html)
- GitHub: [rptashkin's miRNAseq matrix script](https://github.com/rptashkin/TCGA_miRNASeq_matrix)
- Stack Overflow: feature selection based on [variance cut-offs](https://stackoverflow.com/questions/17003928/r-filter-matrix-based-on-variance-cut-offs) in R



