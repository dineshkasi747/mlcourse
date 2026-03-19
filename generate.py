import os

def create_file(path):
    dir_name = os.path.dirname(path)
    if dir_name:  # ✅ only create if folder exists
        os.makedirs(dir_name, exist_ok=True)
    with open(path, 'w') as f:
        f.write(f"<!-- {os.path.basename(path)} - to build -->\n")

def create_js_file(path):
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    with open(path, 'w') as f:
        f.write(f"// {os.path.basename(path)} - to build\n")

def create_css_file(path):
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    with open(path, 'w') as f:
        f.write(f"/* {os.path.basename(path)} - shared styles */\n")

# Root files
create_file("index.html")

# Shared assets
create_css_file("css/main.css")
create_js_file("js/main.js")

# Interactive JS modules
interactive_files = [
    "gradient-descent.js",
    "normalization.js",
    "standardization.js",
    "sigmoid.js",
    "ridge-lasso.js",
    "decision-tree.js",
    "kmeans.js",
    "bias-variance.js",
    "outliers.js",
    "pca.js",
    "train-test-split.js"
]

for file in interactive_files:
    create_js_file(f"js/interactive/{file}")

# Topics
topics = {
    "phase1-data-collection": [
        "csv-loading.html",
        "json-loading.html",
        "sql-loading.html",
        "api-fetching.html",
        "web-scraping.html"
    ],
    "phase2-eda": [
        "data-types.html",
        "univariate-analysis.html",
        "bivariate-analysis.html",
        "multivariate-analysis.html",
        "pandas-profiling.html"
    ],
    "phase3-data-cleaning": [
        "missing-values-types.html",
        "complete-case-analysis.html",
        "simple-imputation.html",
        "knn-imputer.html",
        "mice-iterative-imputer.html",
        "missing-indicator.html",
        "outliers-zscore.html",
        "outliers-iqr.html",
        "winsorization.html"
    ],
    "phase4-feature-engineering": [
        "standardization.html",
        "normalization.html",
        "minmax-scaling.html",
        "robust-scaling.html",
        "ordinal-encoding.html",
        "label-encoding.html",
        "onehot-encoding.html",
        "target-encoding.html",
        "log-transform.html",
        "boxcox-transform.html",
        "yeo-johnson-transform.html",
        "binning-discretization.html",
        "feature-construction.html",
        "feature-splitting.html",
        "datetime-features.html",
        "mixed-variables.html",
        "column-transformer.html",
        "ml-pipelines.html"
    ],
    "phase5-feature-selection": [
        "curse-of-dimensionality.html",
        "filter-methods.html",
        "wrapper-methods.html",
        "embedded-methods.html",
        "pca.html"
    ]
}

for phase, files in topics.items():
    for file in files:
        create_file(f"topics/{phase}/{file}")

# Algorithms
algorithms = {
    "regression": [
        "simple-linear-regression.html",
        "multiple-linear-regression.html",
        "gradient-descent.html",
        "polynomial-regression.html",
        "ridge-regression.html",
        "lasso-regression.html",
        "elasticnet-regression.html",
        "regression-metrics.html"
    ],
    "classification": [
        "logistic-regression.html",
        "softmax-regression.html",
        "naive-bayes.html",
        "knn.html",
        "svm.html",
        "classification-metrics.html"
    ],
    "trees": [
        "entropy.html",
        "information-gain.html",
        "gini-impurity.html",
        "decision-tree.html",
        "regression-tree.html",
        "tree-hyperparameters.html"
    ],
    "ensembles": [
        "ensemble-theory.html",
        "voting-classifier.html",
        "bagging.html",
        "random-forest.html",
        "adaboost.html",
        "gradient-boosting.html",
        "xgboost.html",
        "stacking-blending.html"
    ],
    "unsupervised": [
        "kmeans.html",
        "hierarchical.html",
        "dbscan.html"
    ],
    "realworld": [
        "imbalanced-data.html",
        "cross-validation.html",
        "hyperparameter-tuning.html",
        "overfitting-underfitting.html"
    ]
}

for category, files in algorithms.items():
    for file in files:
        create_file(f"algorithms/{category}/{file}")

# Projects
projects = [
    "house-price.html",
    "titanic.html",
    "customer-churn.html",
    "spam-detection.html",
    "fraud-detection.html"
]

for file in projects:
    create_file(f"algorithms/projects/{file}")

print("✅ Full project structure created successfully!")