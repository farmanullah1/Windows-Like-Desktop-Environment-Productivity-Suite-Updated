# ==============================================================================
# Native Windows Bridge: Read-Only System Metrics Inspector
# Classified: WINDOWS-INTEGRATED (Safe, Read-Only)
# ==============================================================================

[CmdletBinding()]
param()

$ErrorActionPreference = 'SilentlyContinue'

try {
    $os = Get-CimInstance Win32_OperatingSystem
    $cpu = Get-CimInstance Win32_Processor | Select-Object -First 1
    $mem = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum
    $battery = Get-CimInstance Win32_Battery | Select-Object -First 1

    $totalMemGb = [math]::Round($mem.Sum / 1GB, 2)
    $freeMemGb = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
    $usedMemGb = [math]::Round($totalMemGb - $freeMemGb, 2)

    $result = [PSCustomObject]@{
        success = $true
        osName = $os.Caption
        osVersion = $os.Version
        osBuild = $os.BuildNumber
        cpuName = $cpu.Name
        cpuCores = $cpu.NumberOfCores
        cpuLoadPercent = $cpu.LoadPercentage
        totalMemoryGb = $totalMemGb
        usedMemoryGb = $usedMemGb
        batteryPercent = if ($battery) { $battery.EstimatedChargeRemaining } else { 100 }
        isCharging = if ($battery) { ($battery.BatteryStatus -eq 2) } else { $true }
        uptimeSeconds = (New-TimeSpan -Start $os.LastBootUpTime -End (Get-Date)).TotalSeconds
    }

    $result | ConvertTo-Json -Compress
}
catch {
    @{
        success = $false
        error = $_.Exception.Message
    } | ConvertTo-Json -Compress
}
