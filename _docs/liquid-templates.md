---
layout: docs
title: Liquid Templates
description: Complete guide to using Liquid templating in Jekyll.
nav_order: 10
category: Developer
tags: [liquid, templates, jekyll, syntax]
---

# Liquid Templates Guide

Master Jekyll's Liquid templating language for dynamic content generation.

## Basics

### Output Tags

Display variables and expressions:

```liquid
{{ variable }}
{{ site.title }}
{{ page.description }}
```

### Logic Tags

Control flow and iteration:

```liquid
{% if condition %}
  ...
{% elsif other_condition %}
  ...
{% else %}
  ...
{% endif %}

{% for item in array %}
  {{ item }}
{% endfor %}
```

## Variables

### Site Variables

```liquid
{{ site.title }}              # From _config.yml
{{ site.description }}
{{ site.baseurl }}
{{ site.url }}
{{ site.time }}               # Build timestamp
{{ site.pages }}              # All pages
{{ site.posts }}              # All posts
{{ site.data }}               # Data files
```

### Page Variables

```liquid
{{ page.title }}              # Current page title
{{ page.url }}                # Page URL
{{ page.date }}               # Post date
{{ page.content }}            # Page content
{{ page.excerpt }}            # Auto excerpt
{{ page.custom_field }}       # Custom frontmatter
```

### Custom Data

Access `_data/` files:

```liquid
{% for modpack in site.data.mods.modpacks %}
  {{ modpack.name }}
  {{ modpack.description }}
{% endfor %}
```

## Filters

### String Filters

```liquid
{{ "hello world" | capitalize }}        # "Hello world"
{{ "hello world" | upcase }}            # "HELLO WORLD"
{{ "HELLO WORLD" | downcase }}          # "hello world"
{{ "hello world" | truncate: 8 }}       # "hello..."
{{ "hello world" | replace: "world", "there" }}  # "hello there"
{{ "a,b,c" | split: "," }}              # ["a", "b", "c"]
{{ " hello " | strip }}                 # "hello"
{{ "hello" | append: " world" }}        # "hello world"
{{ "world" | prepend: "hello " }}       # "hello world"
{{ "hello-world" | slugify }}           # "hello-world"
```

### Number Filters

```liquid
{{ 4 | plus: 2 }}              # 6
{{ 4 | minus: 2 }}             # 2
{{ 4 | times: 2 }}             # 8
{{ 4 | divided_by: 2 }}        # 2
{{ 4.5 | round }}              # 5
{{ 4.5 | ceil }}               # 5
{{ 4.5 | floor }}              # 4
{{ 1234 | divided_by: 100.0 }} # 12.34
```

### Array Filters

{% raw %}

```liquid
{{ array | join: ", " }}       # Join with separator
{{ array | first }}            # First element
{{ array | last }}             # Last element
{{ array | size }}             # Array length
{{ array | reverse }}          # Reverse order
{{ array | sort }}             # Sort ascending
{{ array | uniq }}             # Remove duplicates
{{ array | where: "key", "value" }}  # Filter by property
{{ array | map: "name" }}      # Extract property
```

{% endraw %}

### Date Filters

```liquid
{{ page.date | date: "%Y-%m-%d" }}           # 2025-12-10
{{ page.date | date: "%B %d, %Y" }}          # December 10, 2025
{{ page.date | date_to_string }}             # 10 Dec 2025
{{ page.date | date_to_long_string }}        # 10 December 2025
{{ page.date | date_to_rfc822 }}             # RFC-822 format
{{ "2025-12-10" | date: "%Y" }}              # 2025
```

### URL Filters

```liquid
{{ "/assets/style.css" | relative_url }}     # /abc-site/assets/style.css
{{ "/page" | absolute_url }}                 # https://site.com/abc-site/page
{{ "path/to/file.md" | replace: ".md", ".html" }}
```

### Jekyll-Specific Filters

```liquid
{{ content | markdownify }}             # Convert Markdown to HTML
{{ content | strip_html }}              # Remove HTML tags
{{ content | number_of_words }}         # Word count
{{ content | jsonify }}                 # Convert to JSON
{{ content | xml_escape }}              # Escape XML characters
{{ content | cgi_escape }}              # URL encode
{{ content | uri_escape }}              # URI encode
```

## Control Flow

### If Statements

```liquid
{% if page.category == "Developer" %}
  <span class="badge">Developer</span>
{% endif %}

{% if page.tags contains "featured" %}
  <span class="featured">★</span>
{% endif %}

{% unless page.published == false %}
  {{ page.content }}
{% endunless %}
```

### Case Statements

```liquid
{% case page.category %}
  {% when "Setup" %}
    <i class="fa-gear"></i>
  {% when "Styling" %}
    <i class="fa-palette"></i>
  {% else %}
    <i class="fa-file"></i>
{% endcase %}
```

### Loops

```liquid
{% for doc in site.docs %}
  <li>{{ doc.title }}</li>
{% endfor %}

{% for doc in site.docs limit:5 %}
  <!-- First 5 only -->
{% endfor %}

{% for doc in site.docs offset:5 %}
  <!-- Skip first 5 -->
{% endfor %}

{% for doc in site.docs reversed %}
  <!-- Reverse order -->
{% endfor %}
```

### Loop Variables

```liquid
{% for item in array %}
  {{ forloop.index }}        # 1, 2, 3, ...
  {{ forloop.index0 }}       # 0, 1, 2, ...
  {{ forloop.first }}        # true on first iteration
  {{ forloop.last }}         # true on last iteration
  {{ forloop.length }}       # Total iterations
  {{ forloop.rindex }}       # Reverse index (from end)
{% endfor %}
```

### Break & Continue

```liquid
{% for item in array %}
  {% if item.hide %}
    {% continue %}
  {% endif %}

  {% if forloop.index > 10 %}
    {% break %}
  {% endif %}

  {{ item.name }}
{% endfor %}
```

## Advanced Techniques

### Assign Variables

```liquid
{% assign my_var = "value" %}
{% assign count = site.docs | size %}
{% assign featured = site.docs | where: "featured", true %}
```

### Capture Blocks

```liquid
{% capture my_variable %}
  Complex content with {{ page.title }}
  and calculations: {{ 5 | times: 10 }}
{% endcapture %}

{{ my_variable }}
```

### Includes

Create reusable components in `_includes/`:

{% raw %}

```liquid
{% include header.html %}
{% include card.html title="Test" description="Description" %}
```

{% endraw %}

With parameters:

{% raw %}

```liquid
<!-- _includes/card.html -->
<div class="card">
  <h3>{{ include.title }}</h3>
  <p>{{ include.description }}</p>
</div>
```

{% endraw %}

### Layouts

Inherit from layouts:

```liquid
<!-- _layouts/docs.html -->
<!DOCTYPE html>
<html>
  <body>
    {{ content }}
  </body>
</html>
```

In page frontmatter:

```yaml
---
layout: docs
title: My Page
---
```

## Practical Examples

### Navigation Menu

```liquid
<nav>
  {% for item in site.data.navigation %}
    <a href="{{ item.url | relative_url }}"
       {% if page.url == item.url %}class="active"{% endif %}>
      {{ item.title }}
    </a>
  {% endfor %}
</nav>
```

### Breadcrumbs

```liquid
<nav class="breadcrumbs">
  <a href="{{ '/' | relative_url }}">Home</a>
  {% if page.category %}
    <span>/</span>
    <a href="{{ '/docs/category/' | append: page.category | slugify | append: '/' | relative_url }}">
      {{ page.category }}
    </a>
  {% endif %}
  <span>/</span>
  <span>{{ page.title }}</span>
</nav>
```

### Pagination

```liquid
{% if paginator.total_pages > 1 %}
  <div class="pagination">
    {% if paginator.previous_page %}
      <a href="{{ paginator.previous_page_path | relative_url }}">Previous</a>
    {% endif %}

    <span>Page {{ paginator.page }} of {{ paginator.total_pages }}</span>

    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | relative_url }}">Next</a>
    {% endif %}
  </div>
{% endif %}
```

### Related Posts

```liquid
{% assign related = site.docs | where: "category", page.category |
                    where_exp: "doc", "doc.url != page.url" |
                    limit: 3 %}

{% if related.size > 0 %}
  <h3>Related Documentation</h3>
  <ul>
    {% for doc in related %}
      <li><a href="{{ doc.url | relative_url }}">{{ doc.title }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```

### Conditional CSS Classes

```liquid
<article class="
  {% if page.featured %}featured{% endif %}
  {% if page.category %}category-{{ page.category | slugify }}{% endif %}
  {% if page.tags contains 'important' %}important{% endif %}
">
  {{ content }}
</article>
```

## Performance Tips

1. **Assign once, use many times:**

   ```liquid
   {% assign docs = site.docs | where: "category", "Setup" %}
   ```

2. **Avoid nested loops when possible:**

   ```liquid
   <!-- Slow -->
   {% for doc in site.docs %}
     {% for tag in doc.tags %}
       ...
     {% endfor %}
   {% endfor %}

   <!-- Faster -->
   {% assign all_tags = site.docs | map: "tags" | join: "," | split: "," | uniq %}
   ```

3. **Cache expensive operations:**
   ```liquid
   {% capture cached_content %}
     <!-- Complex logic here -->
   {% endcapture %}
   ```

## Debugging

### Inspect Variables

```liquid
{{ variable | inspect }}
{{ site.data | jsonify }}
```

### Check Types

```liquid
{% if variable %}
  Variable exists and is truthy
{% endif %}

{% if variable == nil %}
  Variable is nil
{% endif %}

{% if variable == blank %}
  Variable is nil, false, or empty
{% endif %}
```

## Next Steps

- [API Reference](api-reference.html) - Data structure documentation
- [CSS Variables](css-variables.html) - Theme customization
- [Customization Guide](customization.html) - Practical examples
