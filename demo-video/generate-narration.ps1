Add-Type -AssemblyName System.Speech
$text = "Scholarship Scout helps students find funding opportunities with confidence. Start with a lightweight profile: Nigeria, Computer Science, and a target deadline. No passports, passwords, or identity documents are needed. The agent searches thirty real programmes from official provider pages using structured filters. Open a result to see exactly what matches, what mismatches, and what remains unknown. Compare funding, destinations, and requirements before making a decision. When the student chooses an opportunity, Scholarship Scout turns it into a practical checklist. WebMCP exposes search, eligibility, comparison, shortlist, and checklist actions as typed tools. State-changing actions require explicit student confirmation. The student stays in control, every source remains visible, and the app never submits an application automatically. Scholarship Scout: find the opportunities that fit, and apply with confidence."
$speech = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speech.Rate = 0
$speech.Volume = 90
$speech.SetOutputToWaveFile((Join-Path $PSScriptRoot "public\narration.wav"))
$speech.Speak($text)
$speech.Dispose()
