# adawat

The first online catalogue for Arabic NLP tools. This catalogue contains more than 50 tools with around than 25 metadata annotations for each tool. You can view the list of all tools using the link of the webiste [https://arbml.github.io/adawat/](https://arbml.github.io/adawat/)

## Metadata

-   `Id` tool id
-   `Name` name of the tool
-   `Colab link` colab link
-   `Link` link to the source code or website
-   `License` license of the tool
-   `Released Year` year of the publishing the tool/paper
-   `GitHub Repo` yes or no for GitHub repository
-   `Dialect` 
-   `Pricing` free or paid
-   `Form` text, audio or sign language
-   `Accessibility` anonymous or requires authentication
-   `Description` short statement describing the tool
-   `Version` version of the tool
-   `Paper Title` title of the published paper
-   `Paper URL` url of the published paper
-   `Paper Title` title of the paper
-   `Tasks` the tasks included in the tool spearated by comma
-   `Interface` cli of gui
-   `Programming Language` i.e python, java, etc.
-   `Evaluated datasets` datasets used for evaluating, contains ids of masader datasets
-   `Added by` name of the contributer

## Access Data

You can access the annoated tool using `datasets`

```python
from datasets import load_dataset
adawat = load_dataset('arbml/adawat')
adawat['train'][0]
```

which gives the following output

```
{'Id': '1',
 'Name': 'pyarabic',
 'Link': 'https://github.com/linuxscout/pyarabic',
 'Colab link': 'https://colab.research.google.com/github/ARBML/adawat/blob/main/notebooks/pyarabic.ipynb',
 'GitHub Repo': 'Yes',
 'Pricing': 'Free',
 'Accessibility': 'Anonymous',
 'License': 'unknown',
 'Version': '0.6.14',
 'Description': 'A specific Arabic language library for Python, provides basic functions to manipulate Arabic letters and text, like detecting Arabic letters, Arabic letters groups and characteristics, remove diacritics etc.',
 'Paper Title': 'nan',
 'Paper URL': 'nan',
 'Release Year': 2010,
 'Tasks': 'Preprocessing',
 'Supported language(s)': 'Classic Arabic, Arabic MSA, Dialectal Arabic',
 'Tool Type': 'Package',
 'Interface': 'Command Line Interface (CLI)',
 'Programming Language': 'Python',
 'Added by': 'Zaid Alyafeai',
 'Evaluated datasets': 'nan'}
```

## Running Masader locally with Jekyll

### Prerequisites:

1.  Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/).
2.  Install [bundle](https://bundler.io).
3.  Install [Jekyll](https://jekyllrb.com/docs/installation/).

### Steps:

1.  Open the project in the terminal
2.  Run `bundle install` to install dependencies.
3.  Run the site locally with `bundle exec jekyll serve`.
4.  Preview Masader site on your web browser by navigate to `http://127.0.0.1:4000/masader/`.

Note: Navigate to the publishing source for MASADER site. For more information about publishing sources, [see](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#publishing-sources-for-github-pages-sites).

## Contribution

The catalogue will be updated regularly. If you want to add a new tool, use this [form](https://docs.google.com/forms/d/e/1FAIpQLScj-kGwZiniqjYk82z_yeqEgM7xtJ3Kfl1a2ITfgkMtKkVt0g/viewform).

To contribute to the project development, please visit [contributing instructions](CONTRIBUTING.md)
