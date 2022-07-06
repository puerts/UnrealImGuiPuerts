import {ImGui, ImVec2, ImGuiInputTextCallbackData} from 'cpp'
import {$ref, $unref, $set, toCString, toCPtrArray} from 'puerts';

// string literal
let simple_window_titil = toCString("Simple Window"); // faster than passing a string
let fruits = [ "Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"];
let listbox_items = fruits.map(toCString);
let listbox_items_cptr_array = toCPtrArray.apply(null, listbox_items);
(listbox_items_cptr_array as any).__ab = listbox_items; //prevent gc

let f = $ref(0);
let showAnotherWindow = $ref(false);
let showDemoWindow = $ref(false);
let rgb = new Float32Array([114/255, 144/255, 154/255, 255]);
let listbox_item_current = $ref(1);
let default_input_text = $ref("press tab please...");

let multi_line_text = $ref("/*\n" +
    " The Pentium F00F bug, shorthand for F0 0F C7 C8,\n" +
    " the hexadecimal encoding of one offending instruction,\n" +
    " more formally, the invalid operand with locked CMPXCHG8B\n" +
    " instruction bug, is a design flaw in the majority of\n" +
    " Intel Pentium, Pentium MMX, and Pentium OverDrive\n" +
    " processors (all in the P5 microarchitecture).\n" +
    "*/\n\n" +
    "label:\n" +
    "\tlock cmpxchg8b eax\n");

let multi_line_text_input_size = new ImVec2(-Number.MIN_VALUE, ImGui.GetTextLineHeight() * 16);

export function Render() {
    ImGui.Text("Hello, world!");
    ImGui.SliderFloat("float", f, 0.0, 1.0);
    ImGui.ColorEdit3("clear color", rgb);

    if(ImGui.Button("Demo Window"))
    {
        $set(showDemoWindow, !$unref(showDemoWindow));
    }

    if(ImGui.Button("Another Window"))
    {
        $set(showAnotherWindow, !$unref(showAnotherWindow));
    }

    ImGui.ListBox("listbox\n(single select)", listbox_item_current, listbox_items_cptr_array, 9, 4);

    ImGui.Text(`${fruits[$unref(listbox_item_current)]} selected`);

    ImGui.Text(`Application average ${(1000 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);

    if ($unref(showAnotherWindow)) {
        ImGui.SetNextWindowSize(new ImVec2(200, 100), 1 << 2)
        ImGui.Begin(simple_window_titil, showAnotherWindow);
        ImGui.Text("hello world");

        ImGui.InputText("input with callback", default_input_text, 1 << 6, (data:ImGuiInputTextCallbackData) => {
            console.log(`onComplete ${data.BufSize} ${data.SelectionStart} ${data.SelectionEnd}`)
        });
        //ImGuiInputTextFlags_AllowTabInput       = 1 << 10
        ImGui.InputTextMultiline("##source",multi_line_text , multi_line_text_input_size, 1 << 10);
        ImGui.End();
    }

    if ($unref(showDemoWindow)) {
        ImGui.ShowDemoWindow(showDemoWindow);
    }
}
