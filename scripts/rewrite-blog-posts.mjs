import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "blog");

function stripFaqScript(html) {
  return html.replace(
    /\n<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>\s*/g,
    "\n"
  );
}

function stripPostFaq(html) {
  return html.replace(/\n\s*<section class="post-faq"[\s\S]*?<\/section>\s*/g, "\n");
}

function replacePostContent(html, summary, body) {
  // Replace or remove existing post-summary
  if (html.includes('class="post-summary"')) {
    html = html.replace(/<p class="post-summary">[\s\S]*?<\/p>/, `<p class="post-summary">${summary}</p>`);
  } else {
    html = html.replace(
      /(<p class="blog-card-meta">[\s\S]*?<\/p>)\s*(<div class="post-content">)/,
      `$1\n  <p class="post-summary">${summary}</p>\n  $2`
    );
  }
  // Replace post-content body
  html = html.replace(
    /(<div class="post-content">)[\s\S]*?(<\/div>)(\s*<\/article>)/,
    `$1${body}\n$2$3`
  );
  return html;
}

const posts = {

  "deliberate-practice-vs-beating-balls": {
    summary: "The range sells buckets, not results. Deliberate practice is how you turn repetition into something that actually changes your scores.",
    body: `<p>You've hit a big bucket and left feeling like you worked hard. Most of those balls had no clear purpose. You changed your focus four times, the last twenty swings felt worse than the first twenty, and you couldn't tell someone what you were trying to improve. That's beating balls.</p>
<p>Deliberate practice and beating balls can look identical from the outside. Both involve standing on a mat and hitting golf balls. The difference is internal: one has a defined skill target, a way to measure success, and a plan for what changes when you miss. The other has none of those things.</p>
<hr>
<h2>What makes a rep deliberate</h2>
<p>Before you hit ball one, you need four things. A specific goal for the session, not "work on my swing" but "start the ball within three yards of this target with my 7-iron." A feedback mechanism: a gate, an intermediate target, a flight pattern you name before the swing. A difficulty level that makes you fail sometimes but succeed often enough to build on. And rest between groups so you can actually evaluate what's happening.</p>
<p>The goal needs to be narrow enough that you can tell, after five balls, whether you're meeting it. If you can't tell whether the session is going well, the task is too vague.</p>
<hr>
<h2>Why big buckets fool you</h2>
<p>When you get tired, patterns degrade. Your early extension increases. Your grip pressure drifts. Your tempo rushes. By ball 80 of a 100-ball session, you're often practicing the swing you make when you're fatigued, not the one you want on the course.</p>
<p>Three sets of ten with honest feedback and full rest between sets will develop more skill than one bag of 80 casual swings. The range industry benefits from you buying more balls. Your scores benefit from fewer balls used better.</p>
<hr>
<h2>Finding the right difficulty</h2>
<p>If you pass every rep, the task is too easy. Tighten the window, move the gate closer, add a stricter rule. If you fail almost every rep, you're not learning, you're just grinding frustration. Shorten the swing, bring the target closer, slow the tempo until you're succeeding often enough for the reps to teach something.</p>
<p>The sweet spot is roughly succeeding half to two-thirds of the time. That ratio means the task is calibrated to your actual current level, not where you wish you were.</p>
<hr>
<h2>Rest between sets is not optional</h2>
<p>Walking back to your bag between groups of five is part of the drill. You use the walk to think about what just happened and what you're looking for on the next set. Rapid fire from the same mat position trains hurry. Hurry is not what you want on a tight par four with water left.</p>
<p>A reasonable structure is five balls, walk, five balls, walk, five balls. That's fifteen balls with intention. Compare that to fifteen consecutive balls hit from the same spot with the same thought and you've trained something completely different.</p>
<hr>
<h2>Play and practice are both allowed</h2>
<p>Some days you want to enjoy the range without scoring every rep. That's fine. But call it what it is: free hitting. It has value for rhythm and enjoyment. It doesn't have the same training value as deliberate blocks.</p>
<p>A useful split for a session is 25 to 30 balls of deliberate work early, then 15 balls of free hitting to close. You get the training value and the enjoyment. You just don't confuse the two.</p>
<hr>
<h2>How long it takes to see results</h2>
<p>Give a theme three weeks minimum before you judge whether it's working. One session is not enough data. One bad session might be weather, sleep, or the fact that you ate a large lunch. Three weeks of sessions gives you a real trend line.</p>
<p>If you're tracking gate passes over three weeks and the number is flat, the approach needs to change. If it's improving in practice but not showing up on the course, the practice conditions are too comfortable. Make the task harder.</p>
<p>Offcourse helps you log what you worked on, what score you got, and how practice connects to your rounds. When you can see those numbers side by side over months, you stop guessing whether what you're doing is working.</p>`,
  },

  "weekly-golf-practice-routine-busy-schedule": {
    summary: "A weekly golf practice routine only works when it's built around your actual schedule, not around the golfer you wish you were.",
    body: `<p>Most practice plans assume you have three hours a day and no obligations. You have a job, probably a family, and maybe two or three real windows per week. The plan that works isn't the perfect plan. It's the one that holds up when life compresses.</p>
<p>The mistake most golfers make is building a routine around ideal conditions and then treating every imperfect week as a failure. A realistic weekly golf practice routine starts with what you actually have, not what you wish you had.</p>
<hr>
<h2>Start with what's real</h2>
<p>Write down how many practice windows you actually have this week. Not an optimistic estimate. The real version that accounts for work, family, and the fact that you'll be tired on Thursday evening after a long week.</p>
<p>For most working golfers, the realistic structure is one longer anchor session per week plus two shorter windows. If you only have two windows, make one full swing and one short game or putting. That's enough to maintain and gradually improve.</p>
<hr>
<h2>Protect one anchor session</h2>
<p>Your longer block is where deliberate full swing work happens. An hour to ninety minutes is enough if it's structured. Give it a day and a start time. Protect it the way you'd protect a meeting you can't move.</p>
<p>Inside the anchor session, pick one theme for the week. Driver start line. Iron low point. Wedge distance control. One thing, developed over enough reps to actually move. If you change your focus every session, you never gather enough work on one skill to improve it.</p>
<hr>
<h2>Use the short windows for short game</h2>
<p>Twenty or thirty minutes isn't enough for a full range session. It is enough for a putting mat routine, a chipping drill in the backyard, or a focused wedge session with a ball cap and a target.</p>
<p>Short sessions are for maintaining skills that drift when ignored. Putting suffers fast when you stop repeating the stroke. Short game feel goes stale without regular contact. Use your short windows to keep these areas alive, not to start new swing projects.</p>
<hr>
<h2>Give each day a job</h2>
<p>A simple three-day structure: one full swing day with one theme and a ball limit, one short game day with one scoring game, one putting day with start line and lag work even if the space is tight. The days shift based on your schedule. The jobs stay the same.</p>
<p>When Thursday becomes Wednesday because of dinner plans, you don't need to figure out what to do. You know the job for that session. Pick it up and run it.</p>
<hr>
<h2>Write five lines before Monday runs away</h2>
<p>Before the week starts, write down the theme for your anchor session, your ball budget, one success metric, the name of your short session drill, and a 15-minute fallback if the day collapses. That last one matters more than you'd think. It's what separates a week where you did something from a week where you did nothing.</p>
<hr>
<h2>When the whole week falls apart</h2>
<p>You miss Tuesday. Work bleeds into Thursday. Saturday becomes a round instead of a range session. This is a normal week for most people, not a disaster.</p>
<p>If you only get one session, do short game. Putting and chipping decide more rounds than the driver, and they're easier to maintain in tight windows. If you miss a week entirely, pick up the same structure next week without trying to compress two weeks into one.</p>
<hr>
<h2>Rotate the theme, keep the skeleton</h2>
<p>Keep the same weekly structure for at least four weeks. Inside it, shift what you're training. First two weeks of the month on one thing, last two weeks on another. Short game stays consistent throughout.</p>
<p>This prevents the common trap of working on fifteen things at once and never building enough depth on any of them to see real change.</p>
<p>Offcourse makes a weekly golf practice routine easier to stick to when you can log sessions in a few taps and see whether what you practiced is connecting to what's happening in your rounds.</p>`,
  },

  "one-hour-range-session-template": {
    summary: "An hour at the range disappears fast without a plan. This template gives it a structure that leaves you with one honest score and one thing learned.",
    body: `<p>You pay for a bucket, hit a few wedges to warm up, drift toward driver because it's more fun, and realize with fifteen balls left that you haven't worked on anything specific. An hour passes. You're not sure what improved.</p>
<p>A one-hour range session template fixes the order, caps the ball count, and forces one honest test before you leave. The session has four parts. Each one has a job.</p>
<hr>
<h2>Part one: warm-up</h2>
<p>Minutes zero to twelve. Short irons to a specific target. Not hero swings. Not trying to fix anything. You want to find your contact and tempo before you ask for anything more. Ten to fifteen balls, same club, same target.</p>
<p>The mistake most people make is trying to work on something technical during the warm-up. Warm-up is for finding normal, not for building anything new.</p>
<hr>
<h2>Part two: the deliberate block</h2>
<p>Minutes twelve to thirty-five. One theme, one club, measured reps. You chose this before you bought the bucket, based on what cost you strokes in your last round. Start line with a mid iron. Low point with a chalk line on the mat. Driver face strike.</p>
<p>Use 30 to 40 balls in groups of five with a walk between each group. Think about what happened. Decide what you're looking for on the next set. If you're passing most reps easily, make the task harder. If you're failing most, shorten the swing or move the target closer.</p>
<p>This is the most important block in the session. Don't let it bleed into warm-up and don't cut it short to get to the fun part.</p>
<hr>
<h2>Part three: the test</h2>
<p>Minutes thirty-five to fifty. This is where you try to play golf, not execute a drill. Pick nine imaginary shots: different clubs, different targets, different distances. Score each one as a hit or a miss based on a standard you define before you start. No redo. Every ball counts.</p>
<p>The test tells you whether the skill you trained in the deliberate block holds up when the structure is removed. This is closer to the course than anything else you do at the range.</p>
<hr>
<h2>Part four: cooldown</h2>
<p>Minutes fifty to sixty. Ten easy swings. A few wedges. Nothing technical, nothing max effort. You want to leave without a rushed last swing echoing in your memory on the drive home.</p>
<hr>
<h2>Ball math that works</h2>
<p>Seventy balls is enough. Fifteen in warm-up, forty in the deliberate block, fifteen in the test, a few at cooldown if you have them. You don't need 120 balls. Sixty mindful balls improve faster than 120 casual ones.</p>
<p>If you bought a small bucket, cut the deliberate block to 25 balls and keep the test. The test is the most important part of the session. It's the thing that connects practice to performance.</p>
<hr>
<h2>Picking the theme before you swipe the card</h2>
<p>The answer is in your last round. What actually cost strokes? Two-way miss off the tee means driver start line and face control. Thin irons means low point and weight shift. Wedges from 80 yards coming up short or flying long means distance control, not more full swings for the sake of it.</p>
<p>If you don't have a clear answer from your last round, the theme for today is start line. It's the most universal skill and almost always worth time.</p>
<hr>
<h2>Three lines before you leave</h2>
<p>What you worked on, your test score, and one thing you noticed. Ninety seconds. This turns the session from a one-time event into a data point you can build on next week.</p>
<p>Offcourse is built for exactly this: log the session in a few taps, keep the test score honest, and see how your range work connects to what's happening on the scorecard.</p>`,
  },

  "short-game-practice-plan-60-minutes": {
    summary: "Sixty minutes of short game practice is easy to waste. This plan keeps it structured so you leave with a score and a clear skill to repeat next time.",
    body: `<p>Most golfers practice short game by wandering around the chipping green until they feel like leaving. They hit from nice flat lies, skip putting out, ignore sand, and wonder why their scrambling percentage doesn't improve. Sixty minutes without a structure is just an hour of comfortable swings with no feedback.</p>
<p>A structured short game hour has segments, a score, and a hard stop. You leave knowing whether you improved.</p>
<hr>
<h2>The first fifteen minutes: landing zone work</h2>
<p>Don't chip to the hole yet. Pick a landing spot three to five yards onto the green: a coin, a tee in the ground, a leaf. Your job for the first fifteen minutes is to land on it, not to roll the ball to the hole.</p>
<p>Use one club you actually play on the course. Hit twenty chips. Count how many land within one club length of your spot. Write that number. This is your landing accuracy baseline, and it's the skill that actually matters in chipping. Where the ball lands determines where it finishes.</p>
<hr>
<h2>Minutes fifteen to thirty-five: distance control ladder</h2>
<p>Pick two or three distances you face regularly. Maybe ten, twenty, and thirty yards. Five balls each distance. No warm-up between distances, no redo. Score proximity: three points if you finish inside six feet, one point inside twelve, zero if you miss wider.</p>
<p>The goal isn't to be perfect. It's to find out which distance you can control and which one falls apart. The distance that falls apart most is where your next session starts.</p>
<hr>
<h2>Minutes thirty-five to fifty: pressure game</h2>
<p>Pick one game with a clear pass/fail rule. Up and down from six different lies: putt out every time, score your saves out of six. Worst ball: hit two chips from each spot, take the worse result, try to get it up and down. Consecutive: chip from one difficult spot until you land three in a row inside a circle you defined before you started.</p>
<p>The pressure game is what transfers to the course. Casual chipping in easy conditions doesn't train the uncomfortable feeling of needing an up and down to save a score. This block does.</p>
<hr>
<h2>Minutes fifty to sixty: easy finish</h2>
<p>Ten chips with your most comfortable motion to no specific target. No score. You want to finish with a relaxed pattern, not a rushed final attempt at something technical.</p>
<hr>
<h2>The club selection rule</h2>
<p>If you always practice with your 60-degree wedge, you'll always reach for it on the course even when a lower-lofted club bumping along the ground is the smarter play. For at least half your sessions, practice with a pitching wedge, 9-iron, or whatever club gives you the most landing-to-roll options. Boring club, reliable skill.</p>
<hr>
<h2>When you only have thirty minutes</h2>
<p>Do the landing zone block and the pressure game. Skip the distance ladder. Write one score. Thirty minutes with a number beats forty-five minutes of wandering with nothing to show for it.</p>
<hr>
<h2>Spend more time where your game is costing strokes</h2>
<p>If chipping is fine but pitching from twenty to forty yards is killing you, flip the structure. Landing zone from pitching distances, distance ladder from twenty to forty yards, pressure game from a tight lie. The structure works for any short game category. You just have to be honest about which one needs the work.</p>
<p>Offcourse tracks your scrambling percentage and proximity from around the green in rounds so you can see whether your structured short game sessions are showing up where it counts.</p>`,
  },

  "indoor-putting-mat-routine-20-minutes": {
    summary: "Twenty minutes on a putting mat can be real practice or it can be background noise. The difference is structure and a score before you stop.",
    body: `<p>You have fifteen minutes before dinner and a putting mat in the corner. Most people roll some putts, feel okay about it, and move on. That's not practice. You're just keeping the mat warm.</p>
<p>Twenty focused minutes with a clear structure can move your putting faster than an hour of casual practice green rolls. The mat doesn't change the floor. You change what you do on it.</p>
<hr>
<h2>Minutes zero to six: gate work</h2>
<p>Set two tees or coins just wider than a ball, six to twelve inches in front of your ball on your intended line. Hit twenty putts from three to four feet. Count how many pass clean through the gate.</p>
<p>This trains face angle and path at the same time, and it gives you a number. If you pass sixteen of twenty, that's your baseline. If you pass twelve, you have a real problem to work on. The gate doesn't lie.</p>
<hr>
<h2>Minutes six to twelve: start line with full routine</h2>
<p>Use your actual pre-shot routine on every putt. Not a watered-down practice version. The real sequence you'd use on a putt that matters: look at the line, set up to your start point, one trigger, stroke. Ten putts from five to six feet.</p>
<p>Track whether the ball starts on your intended line. Not whether it goes in. Whether it starts where you aimed it. A ball that starts on line and lips out is useful information. A ball that never starts on line is a different problem entirely.</p>
<hr>
<h2>Minutes twelve to eighteen: speed ladder</h2>
<p>Three distances your mat allows. Five putts at each distance. Score proximity: three points inside a small circle or coin, one point close, zero for bad lag.</p>
<p>Speed kills more putts than line. If you only practice from four feet, you get good at four feet and still three-putt from forty. Lag work belongs in every session, even a short one.</p>
<hr>
<h2>Minutes eighteen to twenty: pressure streak</h2>
<p>Set a rule you have to finish. Five clean gate passes in a row from four feet. Three consecutive two-putts from your longest mat distance without leaving the ball outside a circle. If you miss, start over.</p>
<p>The last two minutes should feel different from the previous eighteen. The restart rule is what creates that. This is mild pressure, but it's more than zero, and more than zero is where focus builds.</p>
<hr>
<h2>Mat quirks to account for</h2>
<p>Your mat has a known speed. It may also break slightly left or right depending on how it's laid on the floor. Learn your mat's tendencies so you don't confuse them with stroke problems. If every putt breaks right on the mat but goes straight on the course, you've learned the mat, not the stroke.</p>
<p>Indoor putting doesn't replace reading real greens. But it absolutely trains stroke consistency, face control, and speed feel that transfers when you're standing over a putt that counts.</p>
<hr>
<h2>Three or four short sessions beat one long one</h2>
<p>Putting is a motor skill that responds to frequency more than volume. Twenty minutes three or four times a week will move your putting faster than ninety minutes once a week. Use the mat on the nights you can't get to the course.</p>
<p>Offcourse lets you log mat sessions alongside rounds so you can see whether indoor reps are moving your short putt percentage and reducing your three-putt count over time.</p>`,
  },

  "putting-drills-that-actually-transfer": {
    summary: "Most putting practice is too comfortable to transfer. The drills that actually show up on the course train start line, speed, and a routine you use on every scored putt.",
    body: `<p>Most putting practice is too easy to mean anything. You roll twenty-five footers to a hole, miss most of them, feel fine about it, and walk off the green. Nothing was at stake. Nothing was measured. There's no connection between that and the four-footer you need to make on the eighteenth.</p>
<p>The drills that transfer have three things in common: they measure something specific, they build pressure, and they use the same routine you'd use on a putt that counts.</p>
<hr>
<h2>Gate drill for start line</h2>
<p>Two tees, one ball width apart, placed six to twelve inches in front of the ball on your line. Putts from three to six feet. If you hit a tee, it counts as a miss even if the ball goes in the hole.</p>
<p>Run this until you can consistently pass fifteen of twenty through the gate from four feet. When that becomes routine, move back to five feet and reset. The gate does not care about your feelings. It tells you whether the face is pointing where you think it is.</p>
<hr>
<h2>Clock drill for different lines</h2>
<p>Place balls at three feet around the hole at multiple clock positions. Make all of them without missing. If you miss, start over from where you failed.</p>
<p>This forces you to practice breaking left, breaking right, uphill, and downhill from the same short distance. Most golfers practice only straight putts because they're the most comfortable. Breaking putts are where three-putts hide.</p>
<hr>
<h2>Speed ladder for lag</h2>
<p>Three distances: something long, something medium, something shorter than you'd usually practice. Five putts at each distance. Score inside a circle of roughly three feet around the hole or a target.</p>
<p>Change the distances each session so you never fully memorize the feel. The goal is to develop genuine feel for distance across a range of lengths, not to build a memory bank for three specific yardages.</p>
<hr>
<h2>Your routine on every scored putt</h2>
<p>Here's the mistake most people make: they practice drills with a casual walk-up and stroke, then try to switch to their full routine on the course and wonder why it feels unfamiliar under pressure.</p>
<p>Use your actual routine on every scored putt in practice. Stand behind the ball, read the line, commit to a start point, step in, address, one look at the hole, stroke. Every time. When your course routine and your practice routine are identical, the putt on eighteen feels no different from the twenty you made in the gate drill last Tuesday.</p>
<hr>
<h2>One pressure game per session</h2>
<p>Once a week, add a consequence to a drill. Note your score publicly, make yourself run through the gate drill again if you miss a short putt, set a rule that you finish a streak before you stop. Keep it light, but make it matter.</p>
<p>You can't replicate tournament pressure in your backyard. But you can make practice just uncomfortable enough that it's no longer automatic. That gap between comfortable and automatic is where putting skill actually develops.</p>
<hr>
<h2>When everything feels shaky</h2>
<p>Shrink to gate only for a week. Rebuild start line. Then add speed. Golfers love to fix lag when the face is open at impact. Fix the face first. Everything else gets easier once you can start the ball where you intend.</p>
<p>Offcourse tracks your putting stats in rounds over time so you can see which drills are actually moving your three-putt rate and your percentage from inside six feet.</p>`,
  },

  "driver-range-practice-without-swinging-blind": {
    summary: "Driver practice at the range is easy to waste. You need a defined fairway, a theme, and a score before you pull the headcover.",
    body: `<p>Most driver practice is just hitting it hard and watching it fly. You get some good ones, some bad ones, no real understanding of what's causing either, and no plan for next time. You're not practicing. You're auditing your swing and hoping the results are random enough to average out on the course.</p>
<p>Driver range practice that actually helps has a theme, a defined target, and a way to score yourself before ball one.</p>
<hr>
<h2>Name the miss before you start</h2>
<p>Look at your last round. Did you lose balls right? Did you block it low-left on tight holes? Were you spraying it both ways when it mattered? The miss you face most under pressure is the one to train.</p>
<p>If you can't name a specific miss, spend the first five balls of the session finding it. Not fixing it. Finding it. You need an accurate diagnosis before you build a training block around it.</p>
<hr>
<h2>Define your fairway</h2>
<p>Pick a width you can see from where you're hitting. Two flags, a gap in the rough, a stripe you imagine. Name it before you hit ball one. Ten drivers. Count how many land in the fairway.</p>
<p>Most golfers who think they're inconsistent with driver are hitting their defined fairway 40 to 50 percent of the time. That's the real baseline, and it's more honest than "I hit some good ones." The count makes the session real.</p>
<hr>
<h2>Ball sets, not rapid fire</h2>
<p>Hit in groups of three. Walk back to your bag. Think about what happened on those three and what you want on the next three. You're training a decision-making process, not just a physical motion.</p>
<p>Rapid fire driver practice trains rapid fire thinking. On the course you have 45 seconds between clubs and shots. Use some of that time in practice, or you'll be better at hitting ten consecutive drivers on the range than you are at hitting one driver after a three-minute walk.</p>
<hr>
<h2>One technical theme per session</h2>
<p>If you're working on start line, work on start line. Pick one intermediate target close in front of the ball and commit to starting every swing over it. If you're working on face strike, work on face strike. Not both in the same session.</p>
<p>When you mix multiple technical themes in one session, you get multiple incomplete practice blocks. One theme for thirty balls develops more than ten themes for three balls each.</p>
<hr>
<h2>Build in a pressure shot</h2>
<p>At some point in the session, stand over one driver and treat it like the first tee at a tournament. You have a specific hole in mind. The fairway is defined. You make a full decision, commit to it, and hit it.</p>
<p>Then notice how that felt different from the previous casual warmup balls. The contrast tells you something about what you still need to train: either the commitment, the decision process, or the swing under mild pressure.</p>
<hr>
<h2>When you're struggling</h2>
<p>Cut the session short. Hit twenty balls with a clear theme instead of sixty balls with frustration building. A short, focused session on one cause is more valuable than a long grinding session where you change your fix every ten swings.</p>
<p>If you genuinely can't find the cause of the miss, film three swings and put the club away. You need information, not more confused reps.</p>
<p>Offcourse ties your driving stats to your rounds over time so you can see whether your driver range practice is actually moving your fairways hit percentage on the course.</p>`,
  },

  "wedge-gapping-session-at-the-range": {
    summary: "A wedge gapping session gives you carry distances you can trust on the course instead of distances you're guessing at.",
    body: `<p>You have a 56-degree wedge and you know you hit it "about 90 yards." On the course you have 87 yards, so you pull it and hit it 94. Or 81. Or a partial swing you're not sure about comes up twelve feet short and you make bogey from inside 100 yards.</p>
<p>The gap between how far you think you hit each wedge and how far you actually carry it is costing strokes every round. A gapping session closes that gap with real numbers you trust.</p>
<hr>
<h2>What you're mapping</h2>
<p>Every club you use from 100 yards and in, at full swing and at two or three partial swing lengths. For most players that means pitching wedge, gap wedge, sand wedge, and lob wedge if you carry one, at full, three-quarter, and half swing. That's twelve to sixteen data points. An afternoon's work that pays back every round.</p>
<p>You want carry distance, not total. Carry is what you control. Roll varies based on firmness, slope, and pin location. Map the carry and let the course tell you about roll.</p>
<hr>
<h2>How to run the session</h2>
<p>Warm up until you feel like yourself. Then start with your most lofted wedge at full swing. Hit five balls to a specific target you can see clearly. Throw out any flyer or obvious mishit. Average the rest. Write it down.</p>
<p>Move to the next club. Keep going through all clubs and all swing lengths, resting between sets so your speed stays consistent. Don't do this session when you're tired or after a long range session. Tired swings produce numbers that are low and wrong.</p>
<hr>
<h2>Map your partial swings</h2>
<p>This is the part most golfers skip, and it's where gapping work pays off most directly on the course. Full shots from wedge range are relatively rare. Partial shots are everywhere.</p>
<p>A simple standard: full swing, hands to shoulder height on the backswing, hands to hip height. Three different swing lengths, three different distances, same club. You now know what each of those looks like in the air. This is what gets you from 73 yards without guessing.</p>
<hr>
<h2>The gaps you'll probably find</h2>
<p>Most players have a hole somewhere between their full pitching wedge and their 9-iron, or between their gap wedge and their sand wedge at full swing. These holes are where you need a deliberate partial swing with one club that you practice until you trust it.</p>
<p>Once you've identified a gap, build a drill around the specific distance: ten balls at that yardage from 50 feet behind the flag line, score proximity, same swing every time. You're not just mapping. You're building the skill.</p>
<hr>
<h2>Using the map on the course</h2>
<p>You have 93 yards to the flag. Your map says full sand wedge is 95, three-quarter gap wedge is 88. You pick the three-quarter gap wedge and commit to it. That's a decision based on data, not a guess.</p>
<p>Over time, real-world carries may drift slightly from range numbers based on elevation, temperature, and altitude. Update one window at a time when something feels off in play, rather than re-doing the whole session.</p>
<p>Offcourse stores your wedge distances and tracks your proximity to the hole from scoring range so you can see the gapping session paying off in your scoring stats over time.</p>`,
  },

  "chipping-ladder-drill-variations": {
    summary: "The chipping ladder builds touch through progression, not repetition. These variations keep it honest when the basic version gets too comfortable.",
    body: `<p>The chipping ladder is one of the most useful short game drills you can run. It's also one of the easiest to do wrong. You set up targets, chip until you've hit each one, and move on. The problem is that "until you've hit each one" can mean eight balls or eighty balls depending on luck, and luck doesn't improve your chipping.</p>
<p>The structure matters as much as the targets.</p>
<hr>
<h2>The basic ladder</h2>
<p>Pick four or five landing targets at increasing distances from your hitting position. A coin, a towel, a tee. Each rung has a clear pass rule: land within one club length of the target, three times in a row, before you move to the next rung.</p>
<p>Three in a row matters. Not just three makes total. Consecutive makes. This requires you to actually execute the skill repeatedly rather than get lucky once and move on. If you miss after two in a row, you stay on the same rung.</p>
<hr>
<h2>One club to start</h2>
<p>For the basic ladder, use one club throughout. Your most reliable chipping club for the type of shot these distances produce. Most players default to the lob wedge, which is often the wrong choice for bump-and-run situations. Pick the club you'd actually use in a round from fifteen yards off the green.</p>
<p>Once you can consistently clear the ladder with your primary club, repeat it with a different club. You're building a catalogue of carry distances and landing behaviors across options, not just mastery with one.</p>
<hr>
<h2>Adding time pressure</h2>
<p>Once the basic ladder feels achievable, set a timer. Clear all four rungs in fifteen minutes. The clock creates mild urgency without real stakes, but urgency is what separates practice that transfers from practice that's just comfortable repetition.</p>
<p>You can add a restart rule: miss twice in a row on any rung and drop back one rung. This keeps attention high throughout the drill and prevents the lazy assumption that you'll eventually get lucky.</p>
<hr>
<h2>Variations for different skills</h2>
<p>Blind ladder: chip without looking at where the ball lands. Walk to check the result after each ball. This trains proprioceptive feel for distance rather than visual feedback, which is closer to how touch actually works on the course under pressure.</p>
<p>Lie ladder: run the standard ladder from rough, from tight turf, from an uphill lie, from a sidehill lie. Same targets, different challenges. The lie variations force you to adjust setup and face angle rather than relying on a repeating flat-lie motion.</p>
<p>One-ball competition: one ball per target, one point for landing in the zone, zero for missing. Play eighteen "holes" this way. Your goal is to beat your previous score. This creates a scorecard and makes each ball count.</p>
<hr>
<h2>Connecting it to real scoring</h2>
<p>After you can clear the ladder consistently in practice, move to hole-out work. Chip and putt out. Track your up-and-down percentage over ten attempts from a range of lies around the green.</p>
<p>That number, tracked across a month, tells you whether the chipping ladder work is translating to actual scoring situations or just producing clean technique in perfect conditions.</p>
<p>Offcourse tracks your scrambling percentage in rounds so you can see whether chipping practice shows up in your scoring stats over time.</p>`,
  },

  "range-games-for-boring-buckets": {
    summary: "Games make range sessions feel like golf because they demand decisions and consequences, which is exactly what the course asks for.",
    body: `<p>Hitting the same club at the same target for forty consecutive balls is how you train repetition without transfer. The range rewards that kind of practice. The course punishes it. Golf requires decisions, commitment, and the ability to execute with something on the line. A bucket of target-free swings trains none of those things.</p>
<p>Games fix this. They create decisions. They create stakes. They make your practice feel like a round, which is why they transfer.</p>
<hr>
<h2>Fairway game</h2>
<p>Pick a target and define a fairway around it before you hit ball one. Not a vague "in that general area" but a specific width you can name. Thirty yards wide. Twenty yards wide. Ten yards wide for a tight par four simulation.</p>
<p>Hit ten balls. Each one is a hole. Either you hit the fairway or you don't. Track your score out of ten. Do this with different clubs each session and change the fairway width as your accuracy improves or to match the actual demands of holes you play.</p>
<hr>
<h2>Par game with wedges</h2>
<p>Pick five targets at different distances within your wedge range. Hit to each one. Score yourself as if it's a par three: inside six feet is a birdie, inside fifteen feet is a par, outside fifteen feet is a bogey. Play eighteen holes by cycling through all five targets multiple times.</p>
<p>Keep score. Try to beat your previous score. The wedge game rewards distance control and commitment, which are the two things that determine whether a wedge shot leaves you with a makeable putt or a stress test.</p>
<hr>
<h2>Worst ball drill</h2>
<p>Hit two balls at every target and take the worse result. Move to the next station using only the worse of your two balls. If you have a green to chip to, play out from there with another two chips, taking the worse again.</p>
<p>This forces you to deal with shots you'd rather forget, which is closer to actual golf than hitting from the same perfect setup every time. You get good at recovering, not just at executing clean conditions.</p>
<hr>
<h2>Streak rules</h2>
<p>Pick a club and a target. You can't change to the next club until you hit the target three times in a row. When you miss the third of five, you start the count over. The streak rule keeps attention high without requiring a formal scoring system.</p>
<p>Adapt the streak target to your level. Three in a row for a ten handicap. Five in a row for a scratch player. The difficulty should be calibrated so you're succeeding roughly half the time after a few attempts.</p>
<hr>
<h2>Shot simulation game</h2>
<p>Name a course hole you know. Pick a driver target for the tee shot, then pick an approach target based on where the driver ended up. Score two points for hitting both in regulation, one for hitting one, zero for missing both.</p>
<p>This is closer to golf than any pure drill because it requires decision-making and shot selection on every ball, which is exactly what the course asks for on every shot.</p>
<hr>
<h2>When games become the whole plan</h2>
<p>If every range day is only games, you might be developing general randomness instead of a specific skill. Games work best as the second half of a session, after a deliberate block on one technical theme. Train the skill first, then test it under game pressure.</p>
<p>Offcourse tracks your round stats so you can see which on-course skills are still raw and focus your range games on those specific areas rather than just playing the ones you're already good at.</p>`,
  },

  "golf-mobility-warm-up-before-you-hit-balls": {
    summary: "A ten-minute mobility warm-up before you hit balls means your first real swing is a golf swing, not a warm-up swing masquerading as one.",
    body: `<p>Most golfers warm up by hitting balls. The first swing is a warm-up. So is the second and the third. By the time the body is ready to move well, you've spent twenty balls working out the stiffness and learned nothing useful from any of them.</p>
<p>A ten-minute mobility warm-up before you touch a club changes this. Your first ball is already a golf swing because you're already warm and moving properly.</p>
<hr>
<h2>Why rotation needs preparation</h2>
<p>Golf requires rotation from hips, thoracic spine, and shoulders working together. If any of those links are stiff from sitting at a desk or driving to the course, the swing compensates somewhere else. You might get the same ball flight, but you'll get it in a way that accumulates wear or limits your ceiling.</p>
<p>You don't need a full gym session before every range visit. You need five to ten minutes of targeted movement that wakes up the rotation pattern before you ask it to perform at full speed.</p>
<hr>
<h2>Hip openers</h2>
<p>Stand with feet shoulder-width apart. Draw one knee up and rotate it outward in a circle, then forward, ten rotations each direction on each leg. This opens the hip flexors and external rotators that drive rotation in the downswing.</p>
<p>A simpler variation: step forward into a lunge and rotate your upper body toward your front knee. Hold for two seconds, return, repeat on the other side. Ten per leg. You want to feel the hip opening, not just check the box.</p>
<hr>
<h2>Thoracic rotation</h2>
<p>Sit in a half-kneeling position with one knee on the ground. Put your hands behind your head. Rotate your upper body toward the raised knee, trying to point your elbow at the ceiling. Hold briefly. Ten reps per side.</p>
<p>Or stand with a club across your shoulders and rotate back and through slowly, trying to feel each part of your spine participating rather than just turning at the waist. The thoracic spine is where most golfers lose rotation as they age, and it's where most gains are available with consistent work.</p>
<hr>
<h2>Shoulder and lat preparation</h2>
<p>Arm circles from small to large, forward and backward. Simple and effective. Your shoulders need range of motion in multiple directions for the backswing and follow-through, and they're often tight from desk work or daily posture.</p>
<p>A lat stretch: grip a doorframe overhead, shift your hips sideways, and hold the stretch through your side. The lats connect your arm to your lower body. When they're tight, they limit shoulder turn and contribute to over-the-top paths. Two thirty-second holds per side takes two minutes and makes a real difference in backswing depth.</p>
<hr>
<h2>Build into your swings</h2>
<p>After five to eight minutes of mobility work, start with half swings at 50 percent effort. Full swings at 70 percent. Your first full-effort swing should be around ball ten or fifteen. You're not being precious with your body. You're making sure the first swing that counts is one you made on purpose, not one you made while still working out the stiffness.</p>
<hr>
<h2>Five minutes when that's all you have</h2>
<p>Walk fast for two minutes, do ten hip circles per leg, ten thoracic rotations per side, then hit ten easy wedges before you touch any other club. Five minutes matters more than zero minutes, especially before an early morning round when the body hasn't had time to warm naturally.</p>
<p>Offcourse works best when the data it collects is representative of your actual swing, not your cold-body compensation patterns. Starting with a real warm-up means your practice sessions produce information you can trust.</p>`,
  },

  "mental-routine-before-each-shot-on-range": {
    summary: "The mental routine you build at the range is the one that shows up under pressure. Build the right one deliberately, not by accident.",
    body: `<p>When you're on the course and the round matters, you have a process for each shot. Or you're trying to develop one. When you're at the range, you step up, hit a ball, step back, repeat. No process. No commitment. No real decision.</p>
<p>The problem is that two different mental environments produce two different skills. The swing you build on the range without a routine doesn't show up on the course when you add one under pressure. You have to train the mental routine at the range to bring it to the course.</p>
<hr>
<h2>What a routine actually does</h2>
<p>A pre-shot routine is not superstition or theater. It's a system for narrowing your attention to what matters and committing to a specific outcome before the swing starts. It moves your brain from general "hit a good shot" to specific "start this ball on this line with this trajectory."</p>
<p>The commitment part matters more than the specific steps. A golfer who commits to the wrong shot hits it better than a golfer who is uncommitted to the right one. Commitment is a trainable skill, and the range is where you train it.</p>
<hr>
<h2>A simple three-step structure</h2>
<p>Behind the ball: see the specific target, not a general area. Identify the shot you're going to hit, the shape, the trajectory, the landing zone. Make a decision and commit to it. If you're not sure, take a breath and make a decision anyway. Indecision is worse than the wrong decision.</p>
<p>Beside the ball: set up to the intermediate target you chose from behind the ball. Take one practice motion if that's part of your routine. One look at the target. Address.</p>
<p>Swing: now you swing. Not during the setup. Not after the third practice motion. When you're ready, and not a moment later.</p>
<hr>
<h2>The review that actually helps</h2>
<p>After the shot, spend five seconds on one factual observation. Did it start where you intended? Did you commit to the shot you chose? Was your attention on the target or on mechanics?</p>
<p>You're not judging the shot. You're collecting information. A pulled draw that started where you intended it to start is a different problem from a pulled draw where you aimed right and hoped. Both miss left. One gives you useful data. The other gives you nothing.</p>
<hr>
<h2>Using the routine on every scored ball</h2>
<p>Here is where most people fail. They have a routine in theory and apply it occasionally at the range. On the course, when pressure arrives, the routine feels unfamiliar because they've only used it sometimes.</p>
<p>Use your full routine on every ball in the test block of your range session. Every scored chip. Every tracked putt. Not on the warm-up swings, but on every rep that gets a score. By the time you get to the first tee, you've run this routine hundreds of times already.</p>
<hr>
<h2>What to avoid</h2>
<p>A routine that's too long becomes a ritual you can't complete when you're on the clock in a tournament. Keep it short enough that you can finish it comfortably inside forty-five seconds. A routine that changes every session isn't a routine. Consistency of process is the whole point.</p>
<p>Using swing mechanics during the swing also undermines the routine. A cue is fine. A three-part checklist mid-downswing is not. Pick one short cue if you need one, or use none at all.</p>
<p>Offcourse notes pair well with your mental routine. Log your focus word for the day, note after rounds whether it held up under pressure. This turns your mental game into something you can track and refine rather than something you just hope develops on its own.</p>`,
  },

  "pressure-practice-simulate-the-back-nine": {
    summary: "The gap between practice performance and course performance is not a mystery. You train in zero pressure and show up in high pressure. This is how to close that gap.",
    body: `<p>You practice for two hours on Tuesday and feel great. Saturday you're at the turn, the match is tied, and you stand on the tenth tee with your heart rate elevated and a swing that feels like it belongs to someone else. You hit it right, make double, and wonder what happened to the person you were on Tuesday.</p>
<p>Nothing happened. The Tuesday version of you never practiced under any pressure. The Saturday version showed up in conditions you never trained for.</p>
<hr>
<h2>Why comfort practice doesn't transfer</h2>
<p>You can become extremely good at performing on the range under no pressure. The range doesn't punish misses. There are no stakes. You can hit the same shot ten times until you get the one you want.</p>
<p>The course punishes every miss once. The consequences are immediate and real. If your entire practice history is in the comfortable version, the first time real stakes arrive, your body and brain treat it as a new environment.</p>
<hr>
<h2>Streak rules that create pressure</h2>
<p>Pick a drill and add a rule: you can't stop until you complete five in a row. Gate drill, five consecutive clean passes. Fairway test, three consecutive fairways. Chips inside three feet, four consecutive.</p>
<p>The restart rule is what matters. When you miss the fourth of five in a row, you start over. Your previous miss didn't just cost one attempt. It cost the entire chain. That creates pressure on shots three, four, and five that doesn't exist in standard practice.</p>
<hr>
<h2>Nine-hole game at the range</h2>
<p>Build a nine-hole game with different clubs and targets. Write down the par for each hole before you start. Play each hole with full routine, a specific target, and a penalty for missing that you define in advance.</p>
<p>Score it honestly. Don't count "that was close" as a fairway. Either it's in the zone you defined or it isn't. Keep a running score. Try to beat it next session.</p>
<p>The scorecard creates accountability without requiring anyone else to be present. When you've got a number in the back of your head that you're trying to beat, a mid-round loose swing costs something real.</p>
<hr>
<h2>Adding consequences that fit your situation</h2>
<p>With a friend: play against each other's scores on the same nine-hole game. The higher score buys lunch or re-runs the sequence. Keep it friendly enough that both players still want to show up.</p>
<p>Solo: if you don't reach your target score on the nine-hole game, you run the sequence again before you leave. This creates a completion rule that makes each hole matter to your total.</p>
<hr>
<h2>Choke in practice on purpose</h2>
<p>When you miss under manufactured pressure in practice, you've found a real edge to train. Shrink the task. Make the streak three in a row instead of five. Use a wider fairway. Run the drill until you can pass it under pressure, then narrow it again.</p>
<p>The golfer who has failed under practice pressure and recovered is more resilient on the course than the golfer who has only ever succeeded in comfortable conditions. Choking in practice is useful. It's information.</p>
<p>Offcourse tracks your scoring in rounds over time. When you start adding pressure practice to your routine, you'll have real data to see whether back nine scoring is actually improving.</p>`,
  },

  "journaling-after-rounds-and-range-sessions": {
    summary: "Memory is unreliable. Three lines after a round gives you a data set that improves practice and catches the patterns that memory glosses over.",
    body: `<p>You finish a round with clear impressions of what went wrong. You drive home, eat dinner, and by 9pm the specifics are gone. The chip you chunked on fifteen blurs into a general sense that your short game was off. The drive that blocked right twice becomes "driver was inconsistent." Memory compresses everything into a feeling, not a fact.</p>
<p>Writing three to five lines after a round takes ninety seconds and builds a data set that memory can't. Patterns emerge across months that are invisible in any single round.</p>
<hr>
<h2>What to write after a round</h2>
<p>Four things, kept short. What cost strokes: not "I played badly" but specific shots. Missed three fairways left with driver. Left two chips short of the hole. Three-putted from outside twenty feet twice.</p>
<p>What held up, even briefly. One pattern to investigate: if you missed three fairways left, that's a pattern worth naming, not solving at dinner. One thing to focus on in your next practice session based on what you just observed.</p>
<p>You're not writing a debrief. You're capturing enough to make next week's practice specific to what actually broke instead of general.</p>
<hr>
<h2>What to write after range sessions</h2>
<p>Three things: what you worked on, what drill or game you used, and what score you got if you tracked one. That's the whole entry.</p>
<p>If you worked on iron start line with a gate drill and passed fourteen of twenty, write that. Next session, you know where you started. You can try to beat fourteen. Over six weeks of entries, you have a trend line that tells you whether that skill is actually developing.</p>
<hr>
<h2>The pattern that shows up over months</h2>
<p>After twenty rounds and fifteen range sessions, the patterns become obvious that would never surface from memory alone. You three-putt more in the afternoon than the morning. Driver is reliable in casual rounds and falls apart in competition. Your wedge game from inside 80 yards has improved but the same yardage over water hasn't moved.</p>
<p>This information directs practice more efficiently than intuition. You stop practicing what's comfortable and start practicing what the data says is costing strokes.</p>
<hr>
<h2>Keep the format simple enough to actually use</h2>
<p>A notes app. A dedicated small notebook in your bag. A voice memo on the drive home before the impressions fade. Whatever format you'll actually use consistently is better than a detailed template you abandon after three entries.</p>
<p>If five questions feels like too much, drop to two. If two feels like not enough after a month, add one more. The goal is to capture something consistently, not to execute a perfect system once.</p>
<hr>
<h2>When you played great</h2>
<p>Write what you repeated well. Your routine held up. You committed to the plan off the tee on tight holes. You made good decisions about when to play away from trouble. Great rounds have lessons too, and they're easy to lose because positive results feel self-explanatory.</p>
<p>Offcourse keeps your notes next to your stats and scoring history so the patterns show up visually across time, rather than requiring you to dig through a notebook to find the entry from six weeks ago.</p>`,
  },

  "tracking-progress-what-to-measure-off-course": {
    summary: "Tracking progress off the course keeps practice honest. Two numbers tracked consistently tell you more than twenty numbers tracked once.",
    body: `<p>Golfers spend hours practicing and have no idea whether it's working. They feel like they're improving, then find their handicap has barely moved in a year. The problem usually isn't effort. It's the absence of any measurement connecting practice to performance.</p>
<p>Tracking doesn't require a launch monitor or a spreadsheet. It requires two or three consistent numbers and the discipline to record them.</p>
<hr>
<h2>Start with two numbers, not twenty</h2>
<p>Pick two metrics for the next month. More than three and you'll stop logging. Less than one and you're guessing whether anything is working.</p>
<p>Good starting candidates: fairway percentage, putts per round, up-and-down percentage from around the green, proximity to the hole from wedge range, or gates passed out of twenty in putting practice. Any two of these give you more actionable information than a general sense of "I played okay."</p>
<hr>
<h2>Practice metrics that connect to rounds</h2>
<p>The most useful tracking connects what you measure in practice to what you track in rounds. If you track fairways hit in rounds, track your fairway accuracy in driver practice sessions. Ten drivers at a defined width, count the result. That practice number should predict your round number over time.</p>
<p>If your practice fairway percentage is improving but your round fairway percentage isn't, one of two things is happening: the practice conditions are too easy, or the decision-making on the course is different from the decision-making in practice. Both are solvable problems, but only if you have the numbers to see them.</p>
<hr>
<h2>Gate score for putting</h2>
<p>How many out of twenty putts pass clean through a gate from four feet? Track this every session. It should improve over weeks of deliberate work.</p>
<p>If your gate score is consistently high but your short putt percentage in rounds is disappointing, either your practice conditions are too clean, or you're not using the same routine in practice and on the course. The discrepancy between practice metrics and round metrics tells you where to look.</p>
<hr>
<h2>Proximity from wedge range</h2>
<p>From a consistent yardage in your wedge range, hit ten shots and record average distance to the target. Track this monthly. If it's improving in practice but proximity in rounds isn't moving, you're managing course conditions differently, or the pressure of real rounds is changing the pattern you built in practice.</p>
<p>Distance to the hole from inside 100 yards is one of the highest-leverage metrics in amateur golf. Small improvements here show up directly in scoring because they convert bogeys to pars and pars to birdie looks.</p>
<hr>
<h2>What to do with flat trends</h2>
<p>Look at trends, not individual sessions. One bad day of practice numbers means nothing. A flat line over four weeks means the approach needs to change, not just the volume.</p>
<p>If a metric has been flat for a month, change the drill, not the club. Most flat practice metrics come from doing the same drill in conditions that are no longer challenging enough to force adaptation.</p>
<p>Offcourse is designed for exactly this: track round stats, log practice sessions, and see whether the numbers are moving together or moving apart.</p>`,
  },

  "speed-training-safely-for-more-distance": {
    summary: "Speed training adds real distance when it's done with proper warm-up, short sessions, and enough rest to let the nervous system adapt.",
    body: `<p>The promise of more distance gets players into trouble fast. They buy a training aid, swing it hard for thirty minutes three days in a row, and end up with a sore back, worse contact than before, and a confused swing that's faster but less reliable. Speed training works. Done this way, it doesn't.</p>
<p>Done right, speed training is one of the most direct ways to add distance without rebuilding your swing mechanics. Done wrong, it adds injury risk and dispersion problems.</p>
<hr>
<h2>What speed training is actually doing</h2>
<p>You're training your nervous system to move the club faster. The swing pattern stays largely the same. You're increasing the peak speed at which that pattern executes, by exposing your nervous system to swings that exceed your current ceiling and then letting it adapt.</p>
<p>This is different from swinging harder during normal ball-striking practice. Harder swings without structured overspeed work typically just add tension and compress the pattern. Structured speed training creates a new ceiling without compromising the pattern underneath it.</p>
<hr>
<h2>Warm up more than you think you need to</h2>
<p>Cold muscles cannot produce max speed safely. Before any speed work, do five to eight minutes of mobility, then build up to max effort swings over ten to fifteen preparatory swings at gradually increasing effort. The first max-effort swing of the session should feel like you were already close to it, not like you launched from a standing start.</p>
<p>Skipping warm-up is the most common way speed training becomes injury risk. The tissue needs to be prepared for what you're asking it to do.</p>
<hr>
<h2>Short sessions, full rest</h2>
<p>Most effective speed blocks are three to five minutes of max-effort work with complete rest between each group. You're not doing cardio. You're training peak output, which requires your nervous system to be fully recovered to produce the output again.</p>
<p>A reasonable structure: six max swings, thirty to sixty seconds of full rest, six swings, rest, six swings. That's eighteen max swings with three rest breaks. Total active time is a few minutes. Total session time is fifteen to twenty minutes. That's enough.</p>
<hr>
<h2>Frequency caps matter</h2>
<p>Two to three speed sessions per week is the effective range for most golfers. Your nervous system needs recovery time between max-effort sessions. Doing speed work daily produces diminishing returns quickly and increases the risk of overuse issues in shoulders, elbows, and back.</p>
<p>When you're planning your practice week, treat speed sessions like heavy gym sessions: high effort, low volume, real rest between them.</p>
<hr>
<h2>Managing dispersion during training</h2>
<p>Early in a speed training block, your dispersion may widen. You're moving the club faster than your pattern has been calibrated for, and the pattern hasn't caught up yet. This is temporary and expected.</p>
<p>Keep your normal ball-striking sessions in the schedule alongside speed work. Don't replace contact and start line practice with more speed work. The goal is to raise your speed ceiling while maintaining the pattern you've built. Over six to eight weeks, the speed and the pattern integrate.</p>
<p>Offcourse tracks your driving distance and fairways hit over time so you can see whether speed training is adding yards without adding penalty strokes.</p>`,
  },

  "strength-training-for-golf-without-a-gym": {
    summary: "You can build meaningful golf-specific strength with thirty minutes, three days a week, and no equipment beyond a resistance band.",
    body: `<p>Golf fitness has a reputation for being complicated, time-consuming, and requiring equipment most people don't own. None of that is true. The movements that build golf-relevant strength are basic human patterns that require little or no equipment and can be done in your living room in thirty minutes.</p>
<p>The complication comes from overcomplicating it. Keep it simple and do it consistently.</p>
<hr>
<h2>What the golf swing actually requires</h2>
<p>The swing needs rotational power, the ability to transfer force from the ground upward, stability through the core at impact, and enough mobility to allow the rotation the swing requires. You don't need a barbell for any of this. You need to move through the patterns that build those qualities.</p>
<p>Hip hinge strength. Single-leg stability. Pushing and pulling strength for shoulder and upper body balance. Rotational core stability. Those four categories cover what the golf swing demands.</p>
<hr>
<h2>The four patterns</h2>
<p>Hip hinge: Romanian deadlift with bodyweight or a resistance band. Bend at the hip with a flat back, feel the hamstrings and glutes loading, stand back up. This builds the posterior chain that drives the downswing and protects the lower back over a long season of practice.</p>
<p>Split squat: one foot forward, one back, lower your rear knee toward the ground. Single-leg stability is what allows you to transfer force from the ground without swaying. Most golfers have a strength asymmetry between their lead and trail leg. This finds and corrects it.</p>
<p>Push: push-ups with proper scapular movement, not chest-to-floor collapses. Start elevated on a bench or wall if full push-ups are too hard. Build the shoulder stability and chest strength that the follow-through needs.</p>
<p>Row: resistance band anchored to a door, or lying under a sturdy table pulling your chest toward the edge. This balances the push work and builds the pulling strength that the backswing uses. Golfers who only push and never row develop shoulder imbalances over time.</p>
<hr>
<h2>Core work that transfers</h2>
<p>The golf swing is a rotation around a stable core. Crunches and sit-ups train flexion, which is not what the swing needs. Planks train stiffness, which is closer. Anti-rotation exercises are more specific: hold a resistance band out in front of you anchored to your side and resist the pull. This trains the core to resist rotation, which is how it actually works in the swing.</p>
<p>Add half-kneeling rotation and dead bugs to the mix. Both train the core in positions close to the golf posture. Neither requires equipment.</p>
<hr>
<h2>Two or three sessions per week</h2>
<p>Each session is twenty-five to thirty minutes. Two or three circuits of the four patterns plus core work. Rest between circuits. The schedule matters more than the intensity. Consistent moderate work builds more strength over a season than occasional heavy sessions that leave you sore for a week.</p>
<hr>
<h2>Mobility inside the sessions</h2>
<p>Add hip 90/90 stretches and thoracic rotation between sets. Use the rest periods for mobility work. You're training strength and mobility in the same session rather than treating them as two separate things you'll never have time to do.</p>
<p>Offcourse tracks your rounds over time so you can see whether your off-course training investment is showing up in the quality and consistency of your scores.</p>`,
  },

  "bunker-practice-when-the-course-is-closed": {
    summary: "Bunker play is a learnable skill, not a mystery. These basics and progressions work even when your normal sand access is limited.",
    body: `<p>Most golfers avoid bunkers when they practice and hope for the best on the course. Then they find sand twice a round and each one feels like an emergency. The blade. The skull. The second entry from the same bunker. The card number that follows.</p>
<p>Bunker play is not a mysterious specialty skill reserved for tour players. It has a clear physical process that can be learned and trained with deliberate repetition. Most amateur golfers have simply never done those repetitions.</p>
<hr>
<h2>What actually happens on a standard sand shot</h2>
<p>You're hitting the sand, not the ball. The club enters the sand a few inches behind the ball and slides through it, with the ball carried out on the small wave of sand the club displaces. The key variables are entry point, club speed through the sand, and follow-through.</p>
<p>The face needs to be open at address so the bounce of the club can do its job: sliding through rather than digging in. If you close the face, the leading edge digs. That's where skulls and chunks come from.</p>
<hr>
<h2>When sand isn't available</h2>
<p>Some practice facilities have dedicated bunker areas you can access before rounds. Others have practice areas with soft soil or deep rough mats that simulate the feel. If you have access to a simulator with a bunker setting, use it for the basic contact pattern even though it's not identical.</p>
<p>If none of those are available, practice from tight lies with an open face, focusing on maintaining speed through impact and a complete follow-through. It's not the same as sand, but it trains the acceleration habit that most bunker failures lack.</p>
<hr>
<h2>Building the basics</h2>
<p>Start with ten shots to a landing target on the green, not a hole. Draw a line in the sand a few inches behind the ball as an entry point guide. Count how many of your ten shots reach the target area with a controlled trajectory.</p>
<p>Once you can reliably exit the bunker to a general landing zone, introduce distance control. Short bunker shot from the back of the bunker, medium from the middle, longer from close to the lip. Same technique, different swing length. This is where real sand game development happens.</p>
<hr>
<h2>Common mistakes to train out of your pattern</h2>
<p>Decelerating into impact is the most common bunker problem. You need to accelerate through the sand and hold your finish. If you're slowing down at the ball, you'll blade it or chunk it depending on exactly where the deceleration happens. Commit to a full swing and a complete follow-through before the ball matters.</p>
<p>Opening the face so much that the hosel goes first is the other common error. The face should be open enough for the bounce to work, not so open that the entry path becomes unpredictable. Find the degree of open that produces a consistent entry and an upward exit, and practice from there.</p>
<hr>
<h2>How often</h2>
<p>Two focused bunker sessions per month removes the panic response for most players. If sand is costing you multiple strokes per round, treat it as its own category in your practice week with its own dedicated time.</p>
<p>Keeping short sessions consistent over several months builds more reliable sand play than occasional long sessions when you remember you have a bunker problem.</p>
<p>Offcourse tracks your sand saves and scrambling percentage in rounds so you can see whether bunker practice is reducing the cost of finding sand on the course.</p>`,
  },

  "deload-week-when-your-body-or-scores-stall": {
    summary: "A deload week is structured recovery, not a week off. When your body or scores stall, it's often the signal to reduce volume, not increase it.",
    body: `<p>You've been practicing consistently for six weeks. You're tired. Your swing feels worse than it did a month ago. Your scores have gone up despite working harder. You push through because stopping feels like giving up.</p>
<p>This is the signal for a deload. Not a week off. Not a surrender. A deliberate reduction in volume that lets your body and nervous system recover from the accumulated stress of training.</p>
<hr>
<h2>What a deload is and isn't</h2>
<p>A deload is not skipping practice because you're not motivated. It's a structured week of reduced intensity and volume that you planned in advance, or that you recognize as necessary based on what your body is telling you.</p>
<p>You keep showing up. You keep moving. You stop trying to build new skills and let your body consolidate what it's already working on. The volume drops by 40 to 60 percent. The intention stays.</p>
<hr>
<h2>Physical signs you need one</h2>
<p>Persistent soreness in your shoulders, back, or forearms that isn't clearing between sessions. Fatigue that a good night of sleep doesn't fix. Distance loss that isn't explained by cold conditions or a different ball. When your swing feels worse than it did three weeks ago despite consistent practice, your body might need the volume reduced before the pattern can settle.</p>
<p>The nervous system adapts to training stress during recovery, not during the training itself. If you never give it recovery time, the adaptation never fully happens.</p>
<hr>
<h2>Mental signs you need one</h2>
<p>Dreading practice. Going through the motions without focus. Irritability after bad sessions that stays with you for hours. Inability to move on from a bad shot during a round.</p>
<p>These are symptoms of accumulated mental fatigue, not signs that you need to work harder or change your technique. The answer is less, not more.</p>
<hr>
<h2>What a deload week looks like</h2>
<p>Range sessions at half the normal ball count. No max-effort speed work. Short game touch work without scored drills or pressure games. Easy rounds if you play, without performance expectations or score analysis.</p>
<p>You're not doing nothing. You're keeping the habit alive and letting the physical and mental stress clear. The goal is to arrive at the following week feeling genuinely fresh, not just slightly less tired.</p>
<hr>
<h2>When scores stall even though you're practicing well</h2>
<p>Sometimes scores plateau not because skill development has stopped, but because accumulated training stress is reducing your capacity to perform. You've been building in practice but the tank is running low by Saturday. Take the deload. Some golfers find their scores improve immediately after a lighter week because the nervous system can finally express the skill that's been building under the surface.</p>
<hr>
<h2>Making deloads part of the plan, not an emergency</h2>
<p>Plan one lighter week into every four weeks. The fourth week of a training block is the most common position. This turns the deload from something you do when you're already broken into a scheduled part of how you train, which makes the whole system more sustainable over a full season.</p>
<p>Offcourse keeps a record of your practice volume and round scores over time, which makes it easier to spot the pattern of when you need to back off before you're already deep into a stall.</p>`,
  },

};

for (const [slug, { summary, body }] of Object.entries(posts)) {
  const filePath = path.join(blogDir, slug, "index.html");
  if (!fs.existsSync(filePath)) {
    console.log("MISSING:", slug);
    continue;
  }
  let html = fs.readFileSync(filePath, "utf8");
  html = stripFaqScript(html);
  html = stripPostFaq(html);
  html = replacePostContent(html, summary, body);
  fs.writeFileSync(filePath, html);
  console.log("updated", slug);
}
