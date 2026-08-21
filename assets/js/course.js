/* ==========================================================================
   AI Literacy — Student Course
   Shared behaviour for all modules.

   Every block is guarded, so this one file can load on any page (including
   the index) without errors when a given component isn't present.
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Lecturer-assignment preview toggle
     Demonstrates how a lesson looks with and without a linked assignment.
     ---------------------------------------------------------------------- */
  var demoSwitch = document.getElementById('demoSwitch');
  if (demoSwitch) {
    var toggleDemo = function () {
      var on = document.body.classList.toggle('demo-on');
      demoSwitch.classList.toggle('on', on);
      demoSwitch.setAttribute('aria-pressed', on ? 'true' : 'false');
    };
    demoSwitch.addEventListener('click', toggleDemo);
    demoSwitch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDemo(); }
    });
  }

  /* ----------------------------------------------------------------------
     Multiple-choice checks
     Each .quiz-q carries data-answer; the button checks every question
     inside its own .card.
     ---------------------------------------------------------------------- */
  document.querySelectorAll('[data-check-quiz]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.card');
      if (!card) return;
      card.querySelectorAll('.quiz-q').forEach(function (q) {
        var correct = q.dataset.answer;
        var selected = q.querySelector('input:checked');
        var feedback = q.querySelector('.quiz-feedback');
        q.querySelectorAll('.quiz-opt').forEach(function (o) {
          o.classList.remove('correct', 'incorrect');
        });
        if (!feedback) return;
        if (!selected) {
          feedback.textContent = 'Pick an answer first.';
          feedback.classList.add('show');
          return;
        }
        var chosen = selected.closest('.quiz-opt');
        if (selected.value === correct) {
          chosen.classList.add('correct');
          feedback.textContent = 'Correct.';
        } else {
          chosen.classList.add('incorrect');
          var right = q.querySelector('input[value="' + correct + '"]');
          if (right) right.closest('.quiz-opt').classList.add('correct');
          feedback.textContent = 'Not quite — the highlighted option is correct.';
        }
        feedback.classList.add('show');
      });
    });
  });

  /* ----------------------------------------------------------------------
     Expandable panels — risk cards (M2) and architecture layers (M4)
     ---------------------------------------------------------------------- */
  document.querySelectorAll('.risk, .arch-layer').forEach(function (panel) {
    panel.addEventListener('click', function () {
      panel.classList.toggle('open');
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        panel.classList.toggle('open');
      }
    });
  });

  /* ----------------------------------------------------------------------
     Matching exercise — Module 2, Lesson 2.1
     ---------------------------------------------------------------------- */
  var matchBtn = document.querySelector('[data-check-match]');
  if (matchBtn) {
    matchBtn.addEventListener('click', function () {
      var rows = document.querySelectorAll('#matchSet .match-row');
      var feedback = document.getElementById('matchFeedback');
      var correctCount = 0, answered = 0;
      rows.forEach(function (row) {
        var select = row.querySelector('.match-select');
        row.classList.remove('correct', 'incorrect');
        if (!select.value) return;
        answered++;
        if (select.value === row.dataset.answer) {
          row.classList.add('correct');
          correctCount++;
        } else {
          row.classList.add('incorrect');
        }
      });
      if (!feedback) return;
      feedback.textContent = answered === 0
        ? 'Select a risk for each scenario first.'
        : correctCount + ' of ' + rows.length + ' correct.';
      feedback.classList.add('show');
    });
  }

  /* ----------------------------------------------------------------------
     Trust audit — Module 3, Lesson 3.1
     Click a claim to reveal whether it holds up.
     ---------------------------------------------------------------------- */
  var auditText = document.getElementById('auditText');
  if (auditText) {
    var claims = auditText.querySelectorAll('.claim');
    var verdictBox = document.getElementById('auditVerdict');
    var scoreBox = document.getElementById('auditScore');
    claims.forEach(function (claim) {
      var reveal = function () {
        if (claim.classList.contains('revealed')) return;
        claim.classList.add('revealed');
        var isOk = claim.dataset.verdict === 'ok';
        var item = document.createElement('div');
        item.className = 'verdict-item';
        var mark = document.createElement('span');
        mark.className = 'vmark ' + (isOk ? 'ok' : 'bad');
        mark.textContent = isOk ? 'Holds up' : 'Does not';
        var note = document.createElement('span');
        note.textContent = claim.dataset.note;
        item.appendChild(mark);
        item.appendChild(note);
        verdictBox.appendChild(item);
        verdictBox.classList.add('show');
        var done = auditText.querySelectorAll('.claim.revealed').length;
        scoreBox.textContent = done + ' of ' + claims.length + ' claims checked' +
          (done === claims.length
            ? ' — three of five would have gone into an essay unchallenged.'
            : '');
      };
      claim.addEventListener('click', reveal);
      claim.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Problem sorter — Module 4, Lesson 4.1
     ---------------------------------------------------------------------- */
  document.querySelectorAll('#sorter .sortable').forEach(function (item) {
    item.querySelectorAll('.sort-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (item.classList.contains('answered')) return;
        item.classList.add('answered');
        btn.classList.add('chosen');
        item.classList.add(btn.dataset.choice === item.dataset.answer ? 'right' : 'wrong');
      });
    });
  });

  /* ----------------------------------------------------------------------
     Lesson nav — highlight the section currently in view
     ---------------------------------------------------------------------- */
  var lessons = document.querySelectorAll('.lesson');
  var navLinks = document.querySelectorAll('.lesson-nav a');
  if (lessons.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var link = document.querySelector('.lesson-nav a[data-target="' + entry.target.id + '"]');
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    lessons.forEach(function (l) { observer.observe(l); });
  }
})();
