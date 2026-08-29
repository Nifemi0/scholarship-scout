Add-Type -AssemblyName System.Speech
$text = "Scholarship Scout helps students across countries and fields find funding with confidence. This demo uses one example: Nigeria, Computer Science, any level, and any funding. No passports, passwords, or identity documents are needed. The agent searches thirty curated programmes and keeps every official provider link visible. Open a result to see what matches and what still needs verification. Compare two opportunities at a time before making a decision. When the student chooses the Mastercard Foundation Scholars Program, Scholarship Scout generates three practical tasks: academic records, a personal statement, and partner-specific documents. On the live production site, ChatGPT's in-app browser discovered six typed WebMCP tools. We invoked search, eligibility checks for the top three, two comparisons, and checklist generation. Each eligibility check returned a zero point seven five strong match. The student stays in control, and the app never submits an application automatically. Scholarship Scout: find the opportunities that fit, and apply with confidence."
$speech = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speech.Rate = 2
$speech.Volume = 90
$speech.SetOutputToWaveFile((Join-Path $PSScriptRoot "public\narration.wav"))
$speech.Speak($text)
$speech.Dispose()
