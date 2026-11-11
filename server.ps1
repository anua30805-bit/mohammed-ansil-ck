# Lightweight PowerShell Static HTTP Server with HTTP Range Support
param(
    [int]$Port = 8080
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    $Port = 8081
    $listener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$Port/"
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Output "SERVER_STARTED: $prefix"

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
}

$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = (Get-Location).Path }

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        $filePath = [System.IO.Path]::Combine($baseDir, $urlPath)

        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeMap[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $fileInfo = New-Object System.IO.FileInfo($filePath)
            $totalLen = $fileInfo.Length
            $response.ContentType = $contentType
            $response.AddHeader("Accept-Ranges", "bytes")

            $rangeHeader = $request.Headers["Range"]
            if ($rangeHeader -and $rangeHeader -match "bytes=(\d+)-(\d*)") {
                $start = [int64]$matches[1]
                $end = if ($matches[2]) { [int64]$matches[2] } else { [Math]::Min($start + 2097151, $totalLen - 1) }
                if ($end -ge $totalLen) { $end = $totalLen - 1 }
                $chunkLen = $end - $start + 1

                $response.StatusCode = 206
                $response.AddHeader("Content-Range", "bytes $start-$end/$totalLen")
                $response.ContentLength64 = $chunkLen

                $fs = [System.IO.File]::OpenRead($filePath)
                try {
                    $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                    $buf = New-Object byte[] 65536
                    $rem = $chunkLen
                    while ($rem -gt 0) {
                        $toRead = [int][Math]::Min($buf.Length, $rem)
                        $read = $fs.Read($buf, 0, $toRead)
                        if ($read -le 0) { break }
                        $response.OutputStream.Write($buf, 0, $read)
                        $rem -= $read
                    }
                } catch {} finally {
                    $fs.Dispose()
                }
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $totalLen
                $fs = [System.IO.File]::OpenRead($filePath)
                try {
                    $fs.CopyTo($response.OutputStream, 65536)
                } catch {} finally {
                    $fs.Dispose()
                }
            }
        } else {
            $response.StatusCode = 404
            $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.ContentLength64 = $notFoundMsg.Length
            try {
                $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
            } catch {}
        }

        try { $response.OutputStream.Close() } catch {}
        try { $response.Close() } catch {}
    } catch {
        # Loop protection against listener aborts
    }
}
