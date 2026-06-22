// vitest-md-reporter.ts
import type { Reporter, File } from 'vitest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export default class GitMarkdownReporter implements Reporter {
  onFinished(files: File[] = []) {
    // 1. Pull the recent Git log info
    let gitLog = 'No git log found.';
    try {
      // Pulls last 5 commits with hash, author, date, and message
      gitLog = execSync('git log --pretty=format:"* **%h** - %an, %ar : %s"').toString();
    } catch (error) {
      console.error('Failed to pull git log:', error);
    }

    // 2. Parse and format Vitest test results
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    let testRows = '';

    files.forEach((file) => {
      // In older Vitest versions, tasks are in file.tasks. In newer versions, use file.children
      const tasks = file.tasks || (file as any).children || [];
      
      tasks.forEach((task: any) => {
        totalTests++;
        const status = task.result?.state === 'pass' ? '✅ Pass' : '❌ Fail';
        if (task.result?.state === 'pass') passedTests++;
        else failedTests++;

        const duration = task.result?.duration ? `${task.result.duration}ms` : 'N/A';
        testRows += `| ${file.name} | ${task.name} | ${status} | ${duration} |\n`;
      });
    });

    // 3. Assemble the Markdown file structure
    const markdownContent = `
# Test Run & Git Summary Report
**Generated on:** ${new Date().toLocaleString()}

## 🕒 Recent Git Commit Log
${gitLog}

## 📊 Test Metrics Summary
* **Total Tests:** ${totalTests}
* **Passed:** 😄 ${passedTests}
* **Failed:** 😡 ${failedTests}

## 📝 Detailed Test Breakdown

| File | Test Case | Status | Duration |
| :--- | :--- | :--- | :--- |
${testRows}
`.trim();

    // 4. Write the file to your project directory
    const outputPath = path.resolve(process.cwd(), 'test-report.md');
    fs.writeFileSync(outputPath, markdownContent, 'utf-8');
    console.log(`\n🚀 Markdown report successfully saved to: ${outputPath}\n`);
  }
}
