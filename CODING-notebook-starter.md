# AI Basics: Python Notebook Starter (For Module 3 Hands-On)

**Purpose:** Downloadable code file for students who want to try AI training locally

**Level:** K-12 adapted (simplified, heavy on comments)

**Platform:** Jupyter Notebook / Google Colab (no installation needed)

---

## NOTEBOOK: "Train Your Own AI - Rock, Paper, Scissors"

### Cell 1: Introduction & Setup

```python
# ==========================================
# AI Basics: Train Your Own AI!
# 
# In this notebook, you'll train an AI to recognize
# hand gestures: Rock, Paper, Scissors
# 
# Don't worry if you've never coded before.
# I'll explain everything step-by-step.
# ==========================================

# First, let's import the tools we need
import numpy as np  # For math operations
import matplotlib.pyplot as plt  # For showing pictures
from sklearn.datasets import load_iris  # Sample data
from sklearn.tree import DecisionTreeClassifier  # The AI model

print("✓ All tools loaded! Ready to train AI.")
```

---

### Cell 2: Create Fake Training Data

```python
# In the real world, we'd use a camera to collect rock/paper/scissors
# gestures. For now, let's use made-up data to show how training works.

# Each "gesture" has 3 features:
# - Feature 1: How "open" is your hand? (0-10)
# - Feature 2: How "pointed" are your fingers? (0-10)
# - Feature 3: Hand size (0-10)

# Training data: 20 examples
X_training = np.array([
    # ROCK (closed fist)
    [1, 1, 8],
    [2, 1, 7],
    [1, 2, 9],
    [2, 2, 8],
    [1, 1, 8],
    [2, 1, 7],
    
    # PAPER (flat hand)
    [9, 2, 8],
    [8, 2, 7],
    [9, 3, 9],
    [8, 3, 8],
    [9, 2, 8],
    [8, 2, 7],
    
    # SCISSORS (two fingers)
    [5, 9, 7],
    [5, 8, 8],
    [6, 9, 7],
    [5, 9, 8],
    [5, 8, 7],
    [6, 9, 8],
    [5, 8, 7],
    [6, 9, 8],
])

# Labels: Which gesture is each one?
y_training = np.array([
    0, 0, 0, 0, 0, 0,  # 0 = ROCK
    1, 1, 1, 1, 1, 1,  # 1 = PAPER
    2, 2, 2, 2, 2, 2, 2, 2,  # 2 = SCISSORS
])

gesture_names = ["ROCK", "PAPER", "SCISSORS"]

print("✓ Training data ready!")
print(f"Total examples: {len(X_training)}")
print(f"Gestures: {gesture_names}")
```

---

### Cell 3: Train the AI

```python
# Now we create an AI "brain" and teach it.
# This is called a Decision Tree.

# Create the AI model
ai_brain = DecisionTreeClassifier(max_depth=3)

# TRAIN IT!
# We show the AI all our examples and tell it the correct answer.
# The AI looks for patterns and learns how to recognize them.

ai_brain.fit(X_training, y_training)

print("✓ AI trained!")
print("The AI learned patterns from our examples.")
print("Now it can predict new rock/paper/scissors gestures.")
```

---

### Cell 4: Test the AI (Make a Prediction)

```python
# Let's test our AI on a NEW gesture it's never seen before.

# Example 1: A slightly open hand with sharp fingers
test_gesture_1 = np.array([[2, 3, 8]])  # Looks like ROCK

prediction_1 = ai_brain.predict(test_gesture_1)
confidence_1 = ai_brain.predict_proba(test_gesture_1)

print(f"Test gesture 1: {test_gesture_1}")
print(f"AI predicts: {gesture_names[prediction_1[0]]}")
print(f"Confidence: {confidence_1[0][prediction_1[0]]:.2%}")

print("\n" + "="*50 + "\n")

# Example 2: A very open, flat hand
test_gesture_2 = np.array([[9, 2, 8]])  # Looks like PAPER

prediction_2 = ai_brain.predict(test_gesture_2)
confidence_2 = ai_brain.predict_proba(test_gesture_2)

print(f"Test gesture 2: {test_gesture_2}")
print(f"AI predicts: {gesture_names[prediction_2[0]]}")
print(f"Confidence: {confidence_2[0][prediction_2[0]]:.2%}")

print("\n" + "="*50 + "\n")

# Example 3: Wide open with very pointed fingers
test_gesture_3 = np.array([[6, 9, 7]])  # Looks like SCISSORS

prediction_3 = ai_brain.predict(test_gesture_3)
confidence_3 = ai_brain.predict_proba(test_gesture_3)

print(f"Test gesture 3: {test_gesture_3}")
print(f"AI predicts: {gesture_names[prediction_3[0]]}")
print(f"Confidence: {confidence_3[0][prediction_3[0]]:.2%}")
```

---

### Cell 5: Visualize What the AI Learned

```python
# Let's show what patterns the AI discovered.
# This is called a "Decision Tree" — the AI's thought process.

from sklearn import tree

# Draw the decision tree
plt.figure(figsize=(20, 10))
tree.plot_tree(ai_brain, 
               feature_names=["Openness (0-10)", "Pointiness (0-10)", "Size (0-10)"],
               class_names=gesture_names,
               filled=True,
               rounded=True,
               fontsize=10)
plt.title("How the AI Thinks: Decision Tree")
plt.show()

print("↑ This tree shows the AI's decision-making process.")
print("At each level, it asks a question:")
print("  - Is openness < 5? If yes → check Pointiness")
print("  - Is Pointiness < 4? If yes → probably ROCK")
print("This is how AI recognizes patterns!")
```

---

### Cell 6: Challenge: Train Your Own AI

```python
# Now it's YOUR turn!
# Create new training data and see if you can train the AI to recognize something else.

# For example, you could teach it to recognize:
# - Happy vs Sad faces
# - Hot vs Cold weather
# - Sick vs Healthy plants

# Here's a template:

# 1. Create your own training data
my_X = np.array([
    # Add your examples here (one per row)
    # [feature1, feature2, feature3],
])

my_y = np.array([
    # Add the correct labels here (0, 1, 2, etc.)
])

# 2. Train a new AI
my_ai = DecisionTreeClassifier(max_depth=3)
my_ai.fit(my_X, my_y)

# 3. Test it!
test_example = np.array([[5, 5, 5]])  # Replace with your own test
my_prediction = my_ai.predict(test_example)
print(f"My AI predicts: {my_prediction[0]}")

print("\n✓ You just trained your own AI!")
print("This is exactly how real AI engineers do it.")
```

---

### Cell 7: Key Takeaways

```python
print("""
🎓 WHAT YOU LEARNED TODAY:

1. AI needs examples to learn from
   → We showed the AI 20 examples of gestures

2. AI looks for patterns
   → Hand openness, pointiness, and size are the patterns

3. AI can predict new things it's never seen
   → Even though these were fake examples, the idea is real

4. You can build AI with just a few lines of code
   → No magic, just logic and patterns

5. The more good examples you give, the smarter AI gets
   → 20 examples is tiny; real AI uses millions

🔥 NEXT STEPS:

1. Try the challenge above (train your own AI)
2. Google "Rock, Paper, Scissors OpenCV Python" 
   → That's how to use a REAL camera instead of fake data
3. Explore Kaggle datasets
   → Thousands of free datasets to train AI on

💪 YOU JUST BECAME AN AI ENGINEER.

Well, technically you're an AI trainer. But you understand 
the core concept that billions of dollars of tech is built on.

That's huge.
""")
```

---

## HOW TO USE THIS NOTEBOOK

### For Teachers:
1. Copy this into Google Colab (free, no install)
2. Walk students through cells 1-5 together
3. Assign Cell 6 as a challenge (homework)
4. Share example outputs in class

### For Students (Solo):
1. Open in Google Colab or Jupyter
2. Run each cell in order (Shift+Enter)
3. Read the output
4. Try to understand what's happening
5. Modify the code and see what breaks

### For Parents:
1. This is a fun way to show your kid coding
2. No prior knowledge needed
3. Takes ~30 minutes
4. Can be a great conversation starter about AI

---

## CUSTOMIZATION IDEAS

**Make it More Realistic:**
```python
from tensorflow.keras.preprocessing.image import load_img
# Load real hand gesture images instead of fake data
```

**Make it Harder (Advanced):**
```python
# Use neural networks instead of decision trees
from tensorflow import keras
# Requires more code knowledge
```

**Make it Visual:**
```python
import matplotlib.pyplot as plt
# Plot the training data and predictions
```

---

## TROUBLESHOOTING

**"ModuleNotFoundError: No module named 'sklearn'"**
→ Run this cell first:
```python
!pip install scikit-learn
```

**"My AI is predicting wrong"**
→ You probably need more training examples. Try 30+ instead of 20.

**"The decision tree looks weird"**
→ That's normal! Decision trees don't always look logical to humans. That's AI for you.

---

**Status:** Ready to download | Created: 2026-02-05
**File type:** .ipynb (Jupyter Notebook)
**Can run in:** Google Colab, Jupyter, Replit
**Estimated time:** 30 minutes
