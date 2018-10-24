# Gradeshade

## Description

**A grade visualization tool.**

Students can track and visualize their grades.
Students can see what grade they need to improve.
Teachers can demonstrate averages and weighting.

## Quick Examples

## Quick start

<http://www.gradeshade.com>

## Documentation

### Roadmap

- Main UI Elements
- Teaching tool
- Graph
- Users

### Screenshot

```
--------------------
GS              User   Header
--------------------
     Gradeshade        Title
--------------------
Menu                   Content
  ----------------
  Klass      Grade
    +-ie
  +--------------+
  |              |
  |              |
  |              |
  |    Graph     |
  |              |
  |              |
  |  Cat / Item  |
  +--------------+  Cat / Item Workspace
                f   Possible Range
--------------------
       Legal           Footer
```

### Sitemap

```
  User
    signin
      signout
    signup
  Menu
    Graph
      Klass
        Category
          Item
    Quickstart
    Docs
    Understanding Weights
    Examples
  Legal
  Sitemap
```

### Data Definition

```
User
  id: int
  email: String
  hash: String
  klasses: [Klass]

Klass
  name: String
  uses_weights: Bool
  categories: [Weighted Category]
  points: Number
  max: Number
  ---
  getPoints() -> Number
  getMax() -> Number

Category
  name: String
  weight: Number (0 - 100) | undefined
  items: [Item]
  ---
  points() -> Number
  max() -> Number

Item
  name: String
  points: Number
  max: Number
  date: Date || null

Grade
  constructor(points, max, gradeFunction) -> Grade
  ::letterize(percentage) -> String // "95.00%"
  percentage: Number                // 95.00
  percentageString: String          // "95.00%"
  letter: String                    // "A"
  grade: String                     // "A (95.00%)"
  toString() -> String              // "A (95.00%)"
```

Will live at <http://gradeshade.com/docs>

## Project organization

### Feature Requests

- Grade changes animate
- Autocomplete for categories:
  current words + essays, paper, report
- Answer what grade do I need?
- Save info

### Contributing

Email me below.

### Bug Report

Email me below.

### Author

[Kevin Jackson](mailto:kj31428@gmail.com)

## Legal Notes

License: MIT
Copyright: 2017 - Present
