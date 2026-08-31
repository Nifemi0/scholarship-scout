Add-Type -AssemblyName System.Speech
$text = "Scholarship Scout helps students across countries and fields research funding without hiding uncertainty. This example uses Nigeria, Computer Science, any study level, and any funding. No passport, password, or identity document is needed. The catalog contains thirty named programme records with official provider links, but the app never calls all thirty verified matches. Search ranks candidates using known evidence. Missing facts stay unknown and add no points. Open Chevening to inspect country, field, study-level, destination, and current-route signals. Compare up to three opportunities in the same visible workspace. For the selected result, Scholarship Scout builds source-aware planning tasks and reminds the student to verify the official route. Six typed WebMCP tools expose search, eligibility, comparison, shortlisting, and checklist actions to an agent. Human confirmation protects state changes, and the app never submits an application. Scholarship Scout: clearer evidence, useful next steps, and the student in control."
$speech = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speech.Rate = 2
$speech.Volume = 90
$speech.SetOutputToWaveFile((Join-Path $PSScriptRoot "public\narration.wav"))
$speech.Speak($text)
$speech.Dispose()
