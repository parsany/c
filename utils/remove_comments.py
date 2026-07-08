import os
import sys

def strip_comments(source_code):
    out = []
    i = 0
    n = len(source_code)
    state = "normal"
    
    while i < n:
        c = source_code[i]
        next_c = source_code[i+1] if i + 1 < n else ""
        
        if state == "normal":
            if c == '/' and next_c == '/':
                state = "line_comment"
                i += 2
                continue
            elif c == '/' and next_c == '*':
                state = "block_comment"
                i += 2
                continue
            elif c == "'":
                state = "string_single"
                out.append(c)
                i += 1
                continue
            elif c == '"':
                state = "string_double"
                out.append(c)
                i += 1
                continue
            elif c == '`':
                state = "string_template"
                out.append(c)
                i += 1
                continue
            else:
                out.append(c)
                i += 1
                continue
        elif state == "string_single":
            if c == '\\':
                out.append(c)
                if i + 1 < n:
                    out.append(source_code[i+1])
                i += 2
                continue
            elif c == "'":
                state = "normal"
                out.append(c)
                i += 1
                continue
            else:
                out.append(c)
                i += 1
                continue
        elif state == "string_double":
            if c == '\\':
                out.append(c)
                if i + 1 < n:
                    out.append(source_code[i+1])
                i += 2
                continue
            elif c == '"':
                state = "normal"
                out.append(c)
                i += 1
                continue
            else:
                out.append(c)
                i += 1
                continue
        elif state == "string_template":
            if c == '\\':
                out.append(c)
                if i + 1 < n:
                    out.append(source_code[i+1])
                i += 2
                continue
            elif c == '`':
                state = "normal"
                out.append(c)
                i += 1
                continue
            else:
                out.append(c)
                i += 1
                continue
        elif state == "line_comment":
            if c == '\n' or c == '\r':
                state = "normal"
                out.append(c)
            i += 1
            continue
        elif state == "block_comment":
            if c == '*' and next_c == '/':
                state = "normal"
                i += 2
                continue
            else:
                if c == '\n' or c == '\r':
                    out.append(c)
                i += 1
                continue
                
    return "".join(out)

def clean_file(filepath):
    print(f"Cleaning: {filepath}")
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    cleaned = strip_comments(content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned)

def main():
    targets = [
        "components",
        "pages",
        "utils",
        "styles"
    ]
    extensions = [".js", ".ts", ".tsx", ".css"]
    
    for target in targets:
        if not os.path.exists(target):
            continue
        if os.path.isfile(target):
            if any(target.endswith(ext) for ext in extensions):
                clean_file(target)
        else:
            for root, _, files in os.walk(target):
                for file in files:
                    if any(file.endswith(ext) for ext in extensions):
                        clean_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
