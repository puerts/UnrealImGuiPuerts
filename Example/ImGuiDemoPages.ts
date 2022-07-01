import {ImGui, ImVec2} from 'cpp'
import {$ref, $unref, $set} from 'puerts';

let f = $ref(0);
let showAnotherWindow = $ref(false);
let showDemoWindow = $ref(false);
let rgb = new Float32Array([114/255, 144/255, 154/255, 255]);

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

    ImGui.Text(`Application average ${(1000 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);

    if ($unref(showAnotherWindow)) {
        ImGui.SetNextWindowSize(new ImVec2(200, 100), 1 << 2)
        ImGui.Begin("simple window", showAnotherWindow);
        ImGui.Text("hello world");
        ImGui.End();
    }

    if ($unref(showDemoWindow)) {
        ImGui.ShowDemoWindow(showDemoWindow);
    }
}
