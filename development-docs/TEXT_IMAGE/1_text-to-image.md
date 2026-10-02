# From Words to Numbers: How a Text-to-Image Model Reads Your Prompt

Before an AI can paint "a red car on a beach at sunset", it has to do something much more basic: **read**. And a computer can't read. It only understands numbers.

This article covers that first step: how a sentence becomes a table of numbers. We'll call that table an **embedding**, or simply a **matrix**.

---

## 1. The idea: describe every word with a scorecard

Imagine you're teaching an alien what words mean. You can't explain; you can only hand over a scorecard for each word.

Let's make a tiny scorecard with just **5 features**:

| word  | animal | hair | queen | king | furniture |
|-------|--------|------|-------|------|-----------|
| cat   | 0.9    | 0.8  | 0.0   | 0.0  | 0.0       |
| dog   | 0.9    | 0.7  | 0.0   | 0.0  | 0.0       |
| queen | 0.1    | 0.2  | 0.9   | 0.0  | 0.0       |
| king  | 0.1    | 0.2  | 0.0   | 0.9  | 0.0       |
| door  | 0.0    | 0.0  | 0.0   | 0.0  | 0.9       |

Each row is one word. Each column is one feature. Each cell says "how much does this word have this feature?" from 0 (none) to 1 (a lot).

Look at what happens:

- **cat** and **dog** have almost the same row. The alien learns they're similar.
- **queen** and **king** are similar to each other (royal), and far from "cat".
- **door** is nothing like the others.

Now take the sentence **"the cat is sitting on a door"**. Look up each word and stack the rows:

| word    | animal | hair | queen | king | furniture |
|---------|--------|------|-------|------|-----------|
| the     | 0.0    | 0.0  | 0.0   | 0.0  | 0.0       |
| cat     | 0.9    | 0.8  | 0.0   | 0.0  | 0.0       |
| is      | 0.0    | 0.0  | 0.0   | 0.0  | 0.0       |
| sitting | 0.1    | 0.0  | 0.0   | 0.0  | 0.1       |
| on      | 0.0    | 0.0  | 0.0   | 0.0  | 0.0       |
| a       | 0.0    | 0.0  | 0.0   | 0.0  | 0.0       |
| door    | 0.0    | 0.0  | 0.0   | 0.0  | 0.9       |

That table **is** the embedding of the sentence: 7 words × 5 features. No more English, just numbers the computer can do math on.

> **Honest note:** real models don't use hand-named columns like "animal" or "queen". They *learn* their own columns while reading enormous amounts of text, and no single column has a neat label. Our 5-column table is a toy to build intuition. The principle is identical.

---

## 2. What does "dimension" mean?

**Dimension = the number of columns**, meaning how many numbers describe each word.

- Our toy scorecard: **5 dimensions**.
- A real text model: **thousands of dimensions**.

More dimensions means finer shades of meaning. Five columns can say "a cat is an animal". Thousands of columns can say "a tired, fluffy, orange cat in a cozy, sunny mood".

---

## 3. Words are really "tokens", and tokens are rows

Real models don't read whole words. They chop text into **tokens**, which are small pieces. Common words stay whole. Rarer ones get split.

```
"a red car on a beach at sunset"
 -> [a] [red] [car] [on] [a] [beach] [at] [sun] [set]
```

(The exact split depends on the model.)

This gives us the one relationship worth remembering:

> **Tokens are the rows. Dimensions are the columns.**
> A prompt with 9 tokens and a model with 3,000 dimensions gives a grid of 9 × 3,000.
> A longer prompt adds rows. The number of columns never changes.

---

## 4. The model that does the reading

The job of turning text into a matrix is done by a **text model**. In this article we use **Gemma 4 12B**, a language model from Google.

Its name in short:

- **Gemma 4**: the model family.
- **12B**: about 12 billion learned numbers inside it. That's what it "knows" about language.

You give it a sentence. It gives you back the table.

### Side note: what is "int8"?

You will often see model files named something like `gemma-4-12b-int8`. **int8** means "8-bit integer".

A model is just billions of numbers. Normally each number is stored in a precise, bulky form that takes 16 or 32 bits of space. Storing it as an **8-bit whole number** is like rounding every measurement to the nearest centimeter instead of the nearest millimeter: you lose a tiny bit of precision, but the file becomes much smaller and runs on cheaper hardware, with quality that is usually very close to the original.

Other sizes exist too, such as **int4** (even smaller, a little less precise). Shrinking models this way is called **quantization**, and there is a related idea called **distillation**. Both deserve their own article, so we'll leave them there.

---

## 5. The big trick: the same word gets different numbers in different sentences

In our toy table, "cat" always had the same row. A real model is smarter than that. The numbers for a word **change depending on the words around it**.

Take the word **bank**:

- "I sat on the **river bank** and watched the water."
- "I deposited money in the **bank**."

Same word, completely different meaning. A real model reads the whole sentence before deciding on the numbers:

| sentence                       | row for "bank" leans toward... |
|--------------------------------|---------------------------------|
| "...sat on the river bank..."  | water, shore, grass, nature     |
| "...deposited money in the bank" | money, account, finance, building |

So "bank" gets two different rows, even though it is spelled the same. This is called **preserving context**, and it is what lets the model tell "a red car on a beach" apart from "a car on a red beach". The words are the same, but the meaning is not.

---

## 6. Positive and negative prompts

Text-to-image models usually take two sentences:

- **Positive prompt:** what you want.
- **Negative prompt:** what you don't want.

### Positive prompt

```
a red car on a beach at sunset
```

Run through the text model, it becomes a grid:

|               | dim 1 | dim 2 | dim 3 | ... | dim N |
|---------------|-------|-------|-------|-----|-------|
| token: a      | 0.12  | -0.40 | 0.88  | ... | 0.05  |
| token: red    | 0.91  | 0.33  | -0.21 | ... | 0.47  |
| token: car    | -0.15 | 0.76  | 0.30  | ... | -0.62 |
| token: on     | ...   | ...   | ...   | ... | ...   |
| token: beach  | 0.44  | -0.09 | 0.67  | ... | 0.18  |
| token: sunset | 0.83  | 0.52  | -0.74 | ... | 0.29  |

*(Illustrative values, not real ones.)*

Some numbers are below zero. That does **not** mean "negative prompt". It is just a number below zero, like a temperature below freezing.

### Negative prompt

```
blurry, low quality, distorted
```

It goes through the same text model, in the same way, and comes out as its own grid:

|                | dim 1 | dim 2 | dim 3 | ... | dim N |
|----------------|-------|-------|-------|-----|-------|
| token: blurry  | -0.62 | 0.18  | 0.41  | ... | 0.77  |
| token: low     | 0.05  | -0.33 | 0.29  | ... | -0.14 |
| token: quality | 0.38  | 0.61  | -0.52 | ... | 0.09  |
| ...            | ...   | ...   | ...   | ... | ...   |

It has the same number of columns as the positive grid and a different number of rows, because the sentence has a different number of tokens.

---

## 7. Where does the grid go?

Both grids are handed to the image-making part of the system. From this point on, the image model never sees your English again. It works only from these two grids of numbers.

How it uses them to turn a canvas of random static into a red car is the subject of the next article.

---

## Summary

In this step we learned:

- A computer can't read words, so each word (token) is turned into a **row of numbers**.
- The length of that row is the number of **dimensions**. Tokens are the rows, dimensions are the columns.
- A text model like **Gemma 4 12B** converts a whole sentence into a **matrix**.
- The model preserves **context**: "bank" in "river bank" gets different numbers than "bank" in "money bank".
- The positive and the negative prompt each become their own matrix.

That completes the first step: **text to matrices**.

---

## Quick glossary

- **Embedding / matrix:** a sentence turned into a grid of numbers.
- **Token:** a small chunk of text; one token is one row.
- **Dimension:** how many numbers describe each token (the columns).
- **int8:** storing a model's numbers as 8-bit integers to make it smaller.
- **Quantization:** the general idea of shrinking a model by storing its numbers with less precision.
