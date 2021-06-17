// ReSharper disable Unity.PerformanceCriticalCodeNullComparison

using System.Net.Sockets;
using System.Text;
using BepInEx;
using BepInEx.Configuration;
using HarmonyLib;
using Newtonsoft.Json;

namespace PeekrPlugin
{
    [BepInPlugin("pw.seekr.plugins.peekr", "Peekr", "1.0")]
    [BepInProcess("Distance.exe")]
    public class Peekr : BaseUnityPlugin
    {
        private readonly ConfigEntry<int> _configPort;
        private readonly UdpClient _udpClient = new UdpClient();

        public Peekr()
        {
            _configPort = Config.Bind("General", "Port", 19545);
        }

        private void FixedUpdate()
        {
            var telemetry = CollectTelemetry();
            if (telemetry != null)
            {
                var buf = SerializeTelemetry(telemetry.Value);
                _udpClient.Send(buf, buf.Length, "127.0.0.1", _configPort.Value);
            }
        }

        private static TelemetryMessage? CollectTelemetry()
        {
            var playerManager = G.Sys.PlayerManager_;
            var firstCarCamera = playerManager ? playerManager.FirstCarCamera_ : null;
            var carLogic = firstCarCamera != null ? firstCarCamera.TargetCarLogic_ : null;

            if (carLogic == null)
            {
                return null;
            }

            return new TelemetryMessage
            {
                CarDirectivesBits = carLogic.CarDirectives_.Bits_,
                JumpTimer = Traverse.Create(carLogic.Jump_).Field("jumpTimer_").GetValue<float>(),
                WingsOpen = carLogic.Wings_.WingsOpen_,
            };
        }

        private static byte[] SerializeTelemetry(TelemetryMessage telemetry)
        {
            var jsonString = JsonConvert.SerializeObject(telemetry);
            return Encoding.UTF8.GetBytes(jsonString);
        }
    }

    internal struct TelemetryMessage
    {
        public int CarDirectivesBits;
        public float JumpTimer;
        public bool WingsOpen;
    }
}
