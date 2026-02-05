# Course Player UI Specification

**Purpose:** Define the student-facing course learning interface

**Tech Stack Options:**
- React/Next.js (recommended for performance + interactivity)
- Vue.js (alternative, lighter)
- Vanilla JS (not recommended, too heavy for small team)

---

## UI Structure

### 1. HEADER (Always Visible)

**Left Side:**
- Aplosol logo (clickable → course dashboard)
- Course title: "AI Basics K-2" (gray text)

**Center:**
- Module number + title: "Module 1: What is AI?"
- Progress bar (visual indicator of completion)

**Right Side:**
- User greeting: "Hi [First Name]! 👋"
- Settings icon (profile, email prefs, logout)

**Color:** Dark navy background (#0f172a), white text, blue accents

---

### 2. MAIN VIDEO PLAYER

**Design:**
- Large 16:9 video embedded (responsive, mobile-friendly)
- Video player controls: Play, pause, progress bar, fullscreen, captions (CC toggle)
- Thumbnail preview on hover (showing timestamps)

**Overlay:**
- Subtle brand watermark (bottom corner)
- No ads
- "Next video" auto-play counter (3 sec, dismissible)

**Below Video:**
- Video title: "Module 1: What is AI?" (H2)
- Duration: "10 minutes"
- Transcription toggle: "Show Transcript" (expandable)

---

### 3. SIDEBAR (Right, Collapsible on Mobile)

**Section 1: Module Overview**
- Module title + number (H3)
- Description (2-3 sentences): "In this module, you'll learn what AI really is and how it shows up in your daily life."
- Duration: "10 minutes"
- Est. time to complete full course: "~45 min total"

**Section 2: Learning Objectives**
- Bulleted list (4-5 items)
  ✓ Understand what AI means
  ✓ Identify AI in daily life
  ✓ Recognize patterns
  ✓ Build foundation for next module

**Section 3: Interactive Element** (if applicable)
- "Complete the quiz below" (button)
- "Try the hands-on activity" (button)

---

### 4. QUIZ / INTERACTIVE SECTION (Below Video)

**Design:** Expandable card with light blue background

**Quiz Format:**
- Multiple choice (3-4 options)
- 3-4 questions per module
- Immediate feedback (✓ correct, ✗ incorrect → explanation)
- "Try again" option for wrong answers
- Final score when done: "3/3 Correct! 🎉"

**Example Question:**
```
Q1: What does "Artificial" in "Artificial Intelligence" mean?
A) A copy made by humans
B) Something that's completely fake
C) Intelligence from nature
D) A computer virus

Correct answer: A) A copy made by humans
Explanation: "Artificial" means made by people, not something that occurs naturally.
```

**Interactive Elements (Module 3):**
- Camera permission request (for gesture recognition demo)
- "Hold your hand up and make the Rock gesture" (instruction)
- Real-time AI classification: "Predicted: Rock ✓" (feedback)
- "Try Again" / "Next gesture"

---

### 5. DISCUSSION / COMMENTS SECTION

**Design:** Card-based, collapsible

**Features:**
- "Ask a question or share your thoughts" (text input)
- Display teacher + Krish responses (highlighted)
- Moderation: "We'll review before posting"
- No spam / keep it respectful (light moderation note)

**Data to Show:**
- Author (student name or "Anonymous")
- Timestamp ("2 hours ago")
- Response count ("2 replies")
- Sorting: "Newest" / "Most Helpful"

---

### 6. NAVIGATION (Bottom of Page)

**Left Side:**
- "← Previous Module" (button, disabled if on Module 1)

**Center:**
- Module indicator: "1 / 4" (bold)

**Right Side:**
- "Next Module →" (button, enabled only if quiz passed / video watched)

**Color:** Light gray background, dark text

---

## MOBILE LAYOUT

**Changes:**
- Sidebar moves below video (on mobile)
- Video player: Full-width, auto-resize
- Quiz/interactive: Full-width card
- Navigation: Two-line button layout (stacked)
- Header: Logo + menu icon (hamburger) on mobile

---

## COURSE DASHBOARD (Before Player)

**Purpose:** Show student all available modules + progress

**Layout:**
- Header: "Your Learning Path: AI Basics K-2"
- Progress summary: "2 of 4 modules completed (50%)"

**Module Cards (Grid: 1 col mobile, 2 col tablet, 4 col desktop):**

```
+---------------------+
| Module 1             |
| What is AI?          |
|                     |
| ✓ COMPLETED         |
|                     |
| 10 min • Score 3/3  |
+---------------------+

+---------------------+
| Module 2             |
| How Computers Think  |
|                     |
| 🔄 IN PROGRESS      |
| 70% watched         |
| 11 min • Quiz next  |
+---------------------+

+---------------------+
| Module 3             |
| Train Your AI        |
|                     |
| 🔒 LOCKED           |
| Complete Module 2   |
| 12 min              |
+---------------------+
```

**Each Card Shows:**
- Module number + title (H3)
- Status badge: ✓ Completed, 🔄 In Progress, 🔒 Locked
- Duration
- Score (if taken) or "Quiz pending"
- Progress bar (if started)
- Click to enter module

---

## COLOR SCHEME & TYPOGRAPHY

**Colors:**
- Primary background: Navy (#0f172a)
- Secondary background: Dark blue (#111929)
- Accent: Bright blue (#4b7fff)
- Text primary: White (#ffffff)
- Text secondary: Light gray (#a0aec0)
- Success: Green (#10b981)
- Error: Red (#ef4444)

**Typography:**
- Headings: Poppins Bold (H1: 32px, H2: 24px, H3: 20px)
- Body text: Inter Regular (16px)
- Small text: Inter Regular (14px)

**Spacing:**
- Padding: 16px, 24px, 32px (multiples of 8)
- Gap between sections: 24px

---

## INTERACTIVE FEATURES

### Progress Saving (Automatic)
- Video progress: Auto-saved every 5 seconds
- Quiz answers: Saved when submitted
- Session resume: "Resume where you left off" notification on login

### Notifications
- Modal on quiz completion: "Great job! You scored 3/3. Ready for Module 2?"
- Encouragement: "You're on a 3-module streak! 🔥"
- Reminder (after 7 days inactive): "Come back and finish Module 3"

### Accessibility
- Captions on all videos (auto-generated + reviewed)
- High contrast mode option
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader support (ARIA labels)

---

## TECHNICAL SPEC

### Frontend Framework
- React/Next.js (App Router)
- Tailwind CSS (styling)
- Shadcn/ui (components)
- React Video Player (HLS streaming)

### Backend Requirements
- API endpoint: `GET /api/courses/:courseId/modules/:moduleId`
- Response includes:
  ```json
  {
    "moduleId": "m1",
    "title": "What is AI?",
    "duration": 600,
    "videoUrl": "https://cdn.aplosol.io/m1-video.mp4",
    "objectives": ["Learn X", "Understand Y"],
    "quiz": [
      {
        "id": "q1",
        "question": "...",
        "options": ["A", "B", "C"],
        "correct": 0,
        "explanation": "..."
      }
    ],
    "transcript": "..."
  }
  ```

### Video Hosting
- Cloudinary or Bunny CDN (faster, cheaper than YouTube)
- HLS streaming (adaptive bitrate)
- Captions: WebVTT format (.vtt file)

### Database
- Student progress: Supabase / Firebase
- Quiz scores: Supabase / Firebase
- User auth: NextAuth.js or Clerk

### Performance Targets
- Page load: <2 sec
- Video play start: <1 sec (HLS streaming)
- Interactive response: <100ms

---

## FUTURE ENHANCEMENTS (Post-MVP)

1. **Peer Discussion:** Comments from other students
2. **Leaderboards:** "Top scorers this week" (optional, gamified)
3. **Certificates:** PDF download after course completion
4. **Offline Mode:** Download for airplane/no-wifi scenarios
5. **Integration:** Export progress to Google Classroom / Canvas LMS
6. **Teacher Dashboard:** View student progress across a class
7. **A/B Testing:** Different module structures for learning outcomes
8. **Dark mode toggle:** (Likely already dark, but add light mode option)

---

## WIREFRAME REFERENCE

```
┌─────────────────────────────────────┬─────────────┐
│ Logo  Course Title  Progress ▓▓▓▓   │ Hi Krish! ⚙ │
└─────────────────────────────────────┴─────────────┘

┌──────────────────────────────────────────────────┐
│                                                  │
│          [   VIDEO PLAYER (16:9)    ]            │
│                                                  │
│     ▯ Play    ──────────○──────  00:30 / 10:00  │
│                                                  │
│          [  Toggle Full Screen  ]                │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Module 1: What is AI?                            │
│ In this lesson, you'll learn...                  │
│                                                  │
│ Objectives:                                      │
│ ✓ Understand what AI is                         │
│ ✓ Identify AI in daily life                     │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ QUIZ: Test Your Knowledge                        │
│                                                  │
│ Q1: What does "Artificial" mean?                │
│ ○ A copy made by humans                         │
│ ○ Something completely fake                     │
│ ○ Intelligence from nature                      │
│                                                  │
│ [Submit Answer]                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ [← Prev]  Module 1 / 4  [Next →]                │
└──────────────────────────────────────────────────┘
```

---

**Status:** Ready to build (design + frontend dev)
**Created:** 2026-02-05
**Estimated Dev Time:** 2-3 weeks (React dev) + QA
